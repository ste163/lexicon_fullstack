using System;
using Lexicon.Controllers;
using Lexicon.Models;
using Lexicon.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Xunit;

namespace Lexicon.Tests.Integration
{
    public class ProjectIntegrationTests : EFTestFixture
    {
        public ProjectIntegrationTests()
        {
            AddSampleData();
        }

        [Fact]
        public void User_Can_Only_Add_Projects_With_Unique_Names()
        {
            // Create a project with a unique name
            var project = new Project()
            {
                UserId = 1,
                Name = "SK's Newest Novel",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real ProjectRepo & UserRepo
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add project
            var response = controller.Add(project);

            // Should return created result
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void User_Can_Not_Add_Projects_With_Duplicate_Names()
        {
            // Create a project with a unique name
            var project = new Project()
            {
                UserId = 1,
                Name = "It",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real ProjectRepo & UserRepo
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add project
            var response = controller.Add(project);

            // Should return created result
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Only_Update_Project_With_New_Unique_Name()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real CollectionRepo & UserRepo
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Make a new project to pass in to update
            var projectToUpdate = new Project()
            {
                Id = 2,
                UserId = 1,
                Name = "On Writing",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Attempt to Update project
            var response = controller.Put(projectToUpdate.Id, projectToUpdate);

            // Should return created result
            Assert.IsType<NoContentResult>(response);
        }

        //[Fact]
        //public void User_Can_Not_Update_Collections_With_Duplicate_Names()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
        //                           }, "TestAuthentication"));

        //    // Instantiate a real CollectionRepo & UserRepo
        //    var projectRepo = new CollectionRepository(_context);
        //    var userRepo = new UserRepository(_context);

        //    // Instantiate a real CollectionController, passing in CollectionRepo
        //    var controller = new CollectionController(userRepo, collectionRepo);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Make a new collection to pass in to update
        //    var collectionToUpdate = new Collection()
        //    {
        //        Id = 2,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "Monsters",
        //        Description = "HA-HA! The titles match >:)",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(15)
        //    };

        //    // Attempt to Update collection
        //    var response = controller.Put(collectionToUpdate.Id, collectionToUpdate);

        //    // Should return created result
        //    Assert.IsType<NotFoundResult>(response);
        //}


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
                Name = "The Shining",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            var project2 = new Project()
            {
                UserId = 1,
                Name = "It",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project3 = new Project()
            {
                UserId = 2,
                Name = "The Dark Half",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project4 = new Project()
            {
                UserId = 3,
                Name = "Insomnia",
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
