using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Lexicon.Repositories;
using Lexicon.Controllers.Utils;
using Lexicon.Models;
using Lexicon.Models.ViewModels;
using System.Linq;

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IProjectRepository _projectRepo;
        private readonly IProjectCollectionRepository _projColRepo;
        private readonly ControllerUtils _utils;
        
        public ProjectController(IUserRepository userRepo, IProjectRepository projectRepo, IProjectCollectionRepository projColRepo)
        {
            _userRepo = userRepo;
            _projectRepo = projectRepo;
            _projColRepo = projColRepo;
            _utils = new ControllerUtils(_userRepo);
        }

        [HttpGet]
        public IActionResult GetByUserId()
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // If this person is an anonymous user, return NotFound
            if (firebaseUser == null)
            {
                return NotFound();
            }

            List<Project> projects = _projectRepo.Get(firebaseUser.Id);

            if (projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public IActionResult GetByProjectId(int id)
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // If this person is an anonymous user, return NotFound
            if (firebaseUser == null)
            {
                return NotFound();
            }


            try
            {
                // If a user attempts to get an Id not in the db, causes a NullReferenceException error
                ProjectDetailsViewModel projectDetails = _projectRepo.GetByProjectId(id);

                // If no matching project, return not found
                if (projectDetails == null)
                {
                    return NotFound();
                }

                // If this is not that user's post, don't return it
                if (projectDetails.Project.UserId != firebaseUser.Id)
                {
                    return NotFound();
                }

                // When I get my Words working, I'll have to ensure I'm also bringing back the full word list
                return Ok(projectDetails);
            }
            catch (NullReferenceException e)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Add(ProjectFormViewModel projectForm)
        {
            // For the Add, do not need to check for if the projectCollections are in the db
            // because this Project is unique, there can be no duplicates.

            var firebaseUser = _utils.GetCurrentUser(User);

            // Check to ensure an unauthorized user (anonymous account) can not add a project
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Ensure the userId on the incoming project matches the person making the request
            if (projectForm.Project.UserId != firebaseUser.Id)
            {
                return BadRequest();
            }

            // Get all of this user's projects
            var allProjects = _projectRepo.Get(firebaseUser.Id);

            // see if the name of the incoming collection is in the db
            var projectWithThatName = allProjects.Find(c => c.Name == projectForm.Project.Name);

            // if there is a returned project, we can't add because name isn't unique for this user
            if (projectWithThatName != null)
            {
                return NotFound();
            }

            // Need to add the default requirement for the project here
            projectForm.Project.CreationDate = DateTime.Now;

            try
            {
                _projectRepo.Add(projectForm.Project);

                try
                {
                    // After we add the project, assign the project id to each projectCollection
                    foreach (var projectCollection in projectForm.ProjectCollections)
                    {
                        projectCollection.ProjectId = projectForm.Project.Id;
                    }
                }
                // The user attempted to enter Null for their ProjectCollecitons
                catch (NullReferenceException e)
                {
                    // Make a CollectionDetailsViewModel to pass the created collection into for deletion
                    var projectDetails = new ProjectDetailsViewModel
                        {
                            Project = projectForm.Project,
                            ProjectCollections = new List<ProjectCollection>()
                        };
                    // Remove the just entered collection from db
                    _projectRepo.Delete(projectDetails);

                    // Return a BadRequest
                    return BadRequest();
                }

                // Add ProjectCollections
                _projColRepo.Add(projectForm.ProjectCollections);

                return Ok(projectForm);
            }
            catch (DbUpdateException e)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectFormViewModel incomingProjectForm)
        {
            // Get current user
            var firebaseUser = _utils.GetCurrentUser(User);

            // Ensure an unauthorized user (anonymous account) can not update
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Project Id coming from URL must match the Project object's Id
            if (id != incomingProjectForm.Project.Id)
            {
                return BadRequest();
            }

            // Get Project by Id to ensure it's in db
            ProjectDetailsViewModel projectDetailsToUpdate;

            try
            {
                // If a user attempts to get an Id not in the db, causes a NullReferenceException error
                projectDetailsToUpdate = _projectRepo.GetByProjectId(id);
            }
            catch (NullReferenceException e)
            {
                return NotFound();
            }


            // If it wasn't in the db don't let them update
            if (projectDetailsToUpdate == null)
            {
                return NotFound();
            }



            // Get all of this user's projects
            var allProjects = _projectRepo.Get(firebaseUser.Id);

            // see if the name of the incoming collection is in the db
            var projectWithThatName = allProjects.Where(c => c.Name == incomingProjectForm.Project.Name).ToList();

            // If the count is greater than 1, so it's in the db, check to see what the Id is
            if (projectWithThatName.Count > 0)
            {
                // If the Ids match, we can update, otherwise, it's already in db and not the current item
                if (projectWithThatName[0].Id != incomingProjectForm.Project.Id)
                {
                    return NotFound();
                }
            }

            // Get Project's owner to ensure this is current user's project
            var projectOwnerId = incomingProjectForm.Project.UserId;

            // Check if incoming user is the same one requesting deletion
            if (projectOwnerId != firebaseUser.Id)
            {
                return NotFound();
            }

            // ** At this point, we know the person is able to update the project.

            // By using the projectDetailsToUpdate we retrieved from the db,
            // we re-assign its values that are editable, based on the incoming project
            projectDetailsToUpdate.Project.Name = incomingProjectForm.Project.Name;

            try
            {
                // When updating a Project, we DELETE all current ProjCols then ADD all incoming
                // Delete all the ProjectCollections from collectionToUpdate
                _projColRepo.Delete(projectDetailsToUpdate.ProjectCollections);

                // Add all incoming ProjectCollections
                _projColRepo.Add(incomingProjectForm.ProjectCollections);

                _projectRepo.Update(projectDetailsToUpdate.Project);
                return NoContent();
            }
            catch (DbUpdateException e)
            {
                return Unauthorized(); // When I get this error message in frontend, tell user the Name was already in db
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Get current user
            var firebaseUser = _utils.GetCurrentUser(User);

            // Check to ensure an unauthorized user (anonymous account) can not delete
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Get Project by Id
            var projectToDelete = _projectRepo.GetByProjectId(id);

            //Ensure we have this Project
            if (projectToDelete == null)
            {
                return NotFound();
            }

            // Get Project's owner
            var projectOwner = projectToDelete.Project.UserId;
            // Check if incoming user is the same one requesting deletion
            if (projectOwner != firebaseUser.Id)
            {
                return NotFound();
            }

            // If you pass all those, you're the Project owner and can delete it
            _projectRepo.Delete(projectToDelete);
            return NoContent();
        }
    }
}
