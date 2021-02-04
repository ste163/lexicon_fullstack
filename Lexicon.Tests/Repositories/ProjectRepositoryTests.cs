using Lexicon.Models;
using Lexicon.Repositories;
using System;
using Xunit;

namespace Lexicon.Tests.Repositories
{
    public class ProjectRepositoryTests : EFTestFixture
    {
        public ProjectRepositoryTests()
        {
            // Generate dummy data for in-memory db
            AddSampleData();
        }

        // GET
        [Fact]
        public void User_Can_Get_Their_Projects()
        {
            // Get a userId
            int userId = 1;

            // Instantiate ProjectRepo
            var repo = new ProjectRepository(_context);

            // Get count of all project
            var count = repo.Get(userId).Count;

            // User with Id 1 should have 2
            Assert.True(count == 2);
        }

        [Fact]
        public void User_Can_Get_A_Single_Project_By_Id()
        {
            // Set an expected project to get that's in the db
            var expectedProjectName = "The Haunted House";

            // Get a Project Id that is in the Db
            int projectId = 3;

            // Instantiate ProjectRepo
            var repo = new ProjectRepository(_context);

            // Get Project by its Id
            var actualProject = repo.GetByProjectId(projectId);

            // Two objects should have the same name. Was unable to test if Assert.Equal because Repo returns all the Objects from the FKs
            Assert.True(expectedProjectName == actualProject.Name);
        }



        // ADD
        [Fact]
        public void User_Can_Add_Project()
        {
            // Get a userId
            int userId = 1;

            // Create a new project
            Project project = new Project()
            {
                UserId = 1,
                Name = "Check out this sweeeeeet new pOrject!",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            // Instantiate ProjectRepo
            var repo = new ProjectRepository(_context);

            // Add project
            repo.Add(project);

            // Get new count of all projects
            var count = repo.Get(userId).Count;

            // User with Id 1 should have 3
            Assert.True(count == 3);
        }



        // UPDATE/EDIT
        [Fact]
        public void User_Can_Edit_Project()
        {
            // Instantiate ProjectRepo
            var repo = new ProjectRepository(_context);

            // Get an Project from the Db
            var projectToUpdate = repo.GetByProjectId(1);

            projectToUpdate.Name = "You GOT UPDATED!";

            // Attempt to update
            repo.Update(projectToUpdate);

            // Retrieve item from db to see if updates occurred
            var updatedCollection = repo.GetByProjectId(1);

            // The new names should match
            Assert.True(updatedCollection.Name == projectToUpdate.Name);
        }



        // DELETE
        [Fact]
        public void User_Can_Delete_Project_Without_Any_Other_Linking_Data()
        {
            // Get an object that's in the database
            var projectToAdd = new Project()
            {
                UserId = 1,
                Name = "New Project to Axe",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Instantiate ProjectRepo
            var repo = new ProjectRepository(_context);

            // Get a count of Projects for UserId 1
            var count = repo.Get(1).Count;

            // Add new project
            repo.Add(projectToAdd);

            // Get a new count
            var countAfterAdd = repo.Get(1).Count;

            // Attempt to delete the project
            repo.Delete(projectToAdd);

            // New count after deleting
            var countAfterDeletion = repo.Get(1).Count;

            // We successfully added one project
            Assert.True(count < countAfterAdd);
            // We successfully deleted one project
            Assert.True(count == countAfterDeletion);
        }




        private void AddSampleData()
        {
            var user1 = new User()
            {
                Email = "pennywise@it.com",
                FirebaseUserId = "FIREBASE_ID_1"
            };

            var user2 = new User()
            {
                Email = "bobgray@it.com",
                FirebaseUserId = "FIREBASE_ID_2"
            };

            var user3 = new User()
            {
                Email = "mikehanlon@it.com",
                FirebaseUserId = "FIREBASE_ID_3"
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);
            _context.SaveChanges();

            var project1 = new Project()
            {
                UserId = 1,
                Name = "The Haunted House",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            var project2 = new Project()
            {
                UserId = 1,
                Name = "Spooky Stories",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project3 = new Project()
            {
                UserId = 2,
                Name = "Under the Bed",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project4 = new Project()
            {
                UserId = 3,
                Name = "Big Untitled Story",
                CreationDate = DateTime.Now - TimeSpan.FromDays(5)
            };

            _context.Add(project1);
            _context.Add(project2);
            _context.Add(project3);
            _context.Add(project4);
            _context.SaveChanges();
        }
    }
}
