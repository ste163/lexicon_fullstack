﻿using System;
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
    public class CollectionIntegrationTests : EFTestFixture
    {
        public CollectionIntegrationTests()
        {
            AddSampleData();
        }

        [Fact]
        public void User_Can_Only_Add_Collections_With_Unique_Names()
        {
            // Create a collection with a unique name
            // create a new collectionFormViewModel
            var collectionForm = new CollectionFormViewModel()
            {
                Collection = new Collection()
                {
                    UserId = 1,
                    CategorizationId = 1,
                    Name = "New stuff",
                    Description = "New lame description.",
                    Pinned = false,
                    CreationDate = DateTime.Now - TimeSpan.FromDays(10)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 1,
                        CollectionId = 0 // I won't know this until it's made
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2,
                        CollectionId = 0 // I won't know this until it's made
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add collection
            var response = controller.Add(collectionForm);

            // Should return created result
            Assert.IsType<OkObjectResult>(response);
        }


        [Fact]
        public void User_Can_Not_Add_Collections_With_Duplicate_Names()
        {
            // Create a collection with a duplicate name
            // create a new collectionFormViewModel
            var collectionForm = new CollectionFormViewModel()
            {
                Collection = new Collection()
                {
                    UserId = 1,
                    CategorizationId = 1,
                    Name = "Monsters",
                    Description = "HA-HA! The titles match >:)",
                    Pinned = false,
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 1,
                        CollectionId = 0 // I won't know this until it's made
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2,
                        CollectionId = 0 // I won't know this until it's made
                    }
                }
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add collection
            var response = controller.Add(collectionForm);

            // Should return created result
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Only_Update_Collection_With_New_Unique_Name()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Create a collection with a duplicate name
            // create a new collectionFormViewModel
            var collectionForm = new CollectionFormViewModel()
            {
                Collection = new Collection()
                {
                    Id = 2,
                    UserId = 1,
                    CategorizationId = 1,
                    Name = "Forests",
                    Description = "The titles do not match",
                    Pinned = false,
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 1,
                        CollectionId = 2 // I won't know this until it's made
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2,
                        CollectionId = 2 // I won't know this until it's made
                    }
                }
            };

            // Attempt to Update collection
            var response = controller.Put(collectionForm.Collection.Id, collectionForm);

            // Should return created result
            Assert.IsType<NoContentResult>(response);
        }

        [Fact]
        public void User_Can_Not_Update_Collections_With_Duplicate_Names()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real repos
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);
            var projColRepo = new ProjectCollectionRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo, projColRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Create a collection with a duplicate name
            // create a new collectionFormViewModel
            var collectionForm = new CollectionFormViewModel()
            {
                Collection = new Collection()
                {
                    Id = 2,
                    UserId = 1,
                    CategorizationId = 1,
                    Name = "Monsters",
                    Description = "HA-HA! The titles match >:)",
                    Pinned = false,
                    CreationDate = DateTime.Now - TimeSpan.FromDays(15)
                },

                ProjectCollections = new List<ProjectCollection>()
                {
                    new ProjectCollection()
                    {
                        ProjectId = 1,
                        CollectionId = 0 // I won't know this until it's made
                    },
                    new ProjectCollection()
                    {
                        ProjectId = 2,
                        CollectionId = 0 // I won't know this until it's made
                    }
                }
            };

            // Attempt to Update collection
            var response = controller.Put(collectionForm.Collection.Id, collectionForm);

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
