using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Lexicon.Repositories;
using Lexicon.Controllers.Utils;
using Lexicon.Models;

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IProjectRepository _projectRepo;
        private readonly ControllerUtils _utils;
        
        public ProjectController(IUserRepository userRepo, IProjectRepository projectRepo)
        {
            _userRepo = userRepo;
            _projectRepo = projectRepo;
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

            Project project = _projectRepo.GetByProjectId(id);

            // If no matching project, return not found
            if (project == null)
            {
                return NotFound();
            }

            // If this is not that user's post, don't return it
            if (project.UserId != firebaseUser.Id)
            {
                return NotFound();
            }

            // When I get my Words working, I'll have to ensure I'm also bringing back the full word list
            return Ok(project);
        }

        [HttpPost]
        public IActionResult Add(Project project)
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // Check to ensure an unauthorized user (anonymous account) can not add a project
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Ensure the userId on the incoming project matches the person making the request
            if (project.UserId != firebaseUser.Id)
            {
                return BadRequest();
            }

            // Need to add the default requirement for the project here
            project.CreationDate = DateTime.Now;

            try
            {
                _projectRepo.Add(project);
                return Ok(project);
            }
            catch (DbUpdateException e)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            // Get current user
            var firebaseUser = _utils.GetCurrentUser(User);

            // Ensure an unauthorized user (anonymous account) can not update
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Project Id coming from URL must match the Project object's Id
            if (id != project.Id)
            {
                return BadRequest();
            }

            // Get Project by Id to ensure it's in db
            var projectToUpdate = _projectRepo.GetByProjectId(id);

            // If it wasn't in the db don't let them update
            if (projectToUpdate == null)
            {
                return NotFound();
            }

            // Get Project's owner to ensure this is current user's project
            var projectOwnerId = projectToUpdate.UserId;
            // Check if incoming user is the same one requesting deletion
            if (projectOwnerId != firebaseUser.Id)
            {
                return NotFound();
            }

            // By using the projectToUpdate we retrieved from the db,
            // we re-assign its values that are editable, based on the incoming project
            projectToUpdate.Name = project.Name;

            try
            {
                _projectRepo.Update(projectToUpdate);
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
            var projectOwner = projectToDelete.UserId;
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
