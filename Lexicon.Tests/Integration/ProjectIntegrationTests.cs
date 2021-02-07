using System;
using Lexicon.Controllers;
using Lexicon.Models;
using Lexicon.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Xunit;
using Lexicon.Models.ViewModels;
using System.Collections.Generic;

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
            var projectForm = new ProjectFormViewModel
            {
                Project = new Project()
                {
                    UserId = 1,
                    Name = "SK's Newest Novel",
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 0, // I won't know this until it's made
                        CollectionId = 2
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 0, // I won't know this until it's made
                        CollectionId = 1
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add project
            var response = controller.Add(projectForm);

            // Should return created result
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void User_Can_Not_Add_Projects_With_Duplicate_Names()
        {
            // Create a project with a duplicate name
            var projectForm = new ProjectFormViewModel
            {
                Project = new Project()
                {
                    UserId = 1,
                    Name = "It",
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 0, // I won't know this until it's made
                        CollectionId = 2
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 0, // I won't know this until it's made
                        CollectionId = 1
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add project
            var response = controller.Add(projectForm);

            // Should return created result
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Only_Update_Project_With_New_Unique_Name()
        {
            // Make a new project to pass in to update
            var projectForm = new ProjectFormViewModel
            {
                Project = new Project()
                {
                    Id = 2,
                    UserId = 1,
                    Name = "On Writing",
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 2, // I won't know this until it's made
                        CollectionId = 2
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2, // I won't know this until it's made
                        CollectionId = 1
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Update project
            var response = controller.Put(projectForm.Project.Id, projectForm);

            // Should return created result
            Assert.IsType<NoContentResult>(response);
        }

        [Fact]
        public void User_Can_Not_Update_Projects_With_Duplicate_Names()
        {
            // Make a new project to pass in to update
            var projectForm = new ProjectFormViewModel
            {
                Project = new Project()
                {
                    Id = 2,
                    UserId = 1,
                    Name = "It",
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 2, // I won't know this until it's made
                        CollectionId = 2
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2, // I won't know this until it's made
                        CollectionId = 1
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var projectRepo = new ProjectRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real ProjectController, passing in ProjectRepo
            var controller = new ProjectController(userRepo, projectRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller
       
            // Attempt to Update project
            var response = controller.Put(projectForm.Project.Id, projectForm);

            // Should return created result
            Assert.IsType<NotFoundResult>(response);
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

            var categorization1 = new Categorization()
            {
                Type = "Alphabetical"
            };

            var categorization2 = new Categorization()
            {
                Type = "Part of Speech"
            };

            _context.Add(categorization1);
            _context.Add(categorization2);
            _context.SaveChanges();

            var collection1 = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "Monsters",
                Description = "Monsters and related words It becomes.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            var collection2 = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "Scary places",
                Description = "Spooky places It probably hangs at.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var collection3 = new Collection()
            {
                UserId = 2,
                CategorizationId = 1,
                Name = "Fear",
                Description = "All the words that cause scary feelings.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var collection4 = new Collection()
            {
                UserId = 3,
                CategorizationId = 2,
                Name = "Research",
                Description = "Things related to researching",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(5)
            };

            _context.Add(collection1);
            _context.Add(collection2);
            _context.Add(collection3);
            _context.Add(collection4);
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
