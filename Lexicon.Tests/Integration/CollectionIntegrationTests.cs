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
            var collection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "Winter",
                Description = "Wintery words. Because It hates the holidays.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real CollectionRepo & UserRepo
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add collection
            var response = controller.Add(collection);

            // Should return created result
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void User_Can_Not_Add_Collections_With_Duplicate_Names()
        {
            // Create a collection with a unique name
            var collection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "Monsters",
                Description = "HA-HA! The titles match >:)",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_ID_1"),
                                   }, "TestAuthentication"));

            // Instantiate a real CollectionRepo & UserRepo
            var collectionRepo = new CollectionRepository(_context);
            var userRepo = new UserRepository(_context);

            // Instantiate a real CollectionController, passing in CollectionRepo
            var controller = new CollectionController(userRepo, collectionRepo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add collection
            var response = controller.Add(collection);

            // Should return created result
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Only_Update_A_Post_With_A_New_Unique_Name()
        {

        }

        [Fact]
        public void User_Can_Not_Update_A_Post_With_A_Name_Already_In_Db()
        {

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
        }
    }
}
