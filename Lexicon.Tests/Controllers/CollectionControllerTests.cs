using Moq;
using Xunit;
using Lexicon.Models;
using Lexicon.Repositories;
using Lexicon.Controllers;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace Lexicon.Tests.Controllers
{
    public class CollectionControllerTests
    {
        private Mock<IUserRepository> _fakeUserRepo;
        private Mock<ICollectionRepository> _fakeCollectionRepo;

        public CollectionControllerTests()
        {
            // Spoof a User Repo
            _fakeUserRepo = new Mock<IUserRepository>();
            // Whenever this GetByFirebaseUserId is called, return user with Id 1
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER1")).Returns(new User() { Id = 1, Email = "pennywise@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER2")).Returns(new User() { Id = 2, Email = "bobgray@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER3")).Returns(new User() { Id = 3, Email = "mikehanlon@it.com" });

            // Spoof a Collection Repo
            // You do not have to have the full object coming back with all the required NOT NULL, etc.
            // We are not faking a db, just the items that would come out of it.
            _fakeCollectionRepo = new Mock<ICollectionRepository>();
            // Whenever a user with this Id calls the Get method, return this list of collections
            _fakeCollectionRepo.Setup(r => r.Get(It.Is<int>(i => i == 1))).Returns((int id) => new List<Collection>() { new Collection() { Id = 1, Name = "Scary places", Description = "Spooky places It probably hangs at."}, new Collection() { Id = 2, Name = "Monsters", Description = "Monsters It becomes." } });
            _fakeCollectionRepo.Setup(r => r.Get(It.Is<int>(i => i == 2))).Returns((int id) => new List<Collection>() { new Collection() { Id = 1, Name = "Swampy", Description = "Icky words related to swamps" }, new Collection() { Id = 2, Name = "Spooky", Description = "Spooky related words." } });
            // Whenever we enter Id 1, return this object
            _fakeCollectionRepo.Setup(r => r.GetByCollectionId(1)).Returns(new Collection() { Id = 1, Name = "Swampy", Description = "Icky words related to swamps", UserId = 1 });
            _fakeCollectionRepo.Setup(r => r.GetByCollectionId(2)).Returns(new Collection() { Id = 1, Name = "Scary places", Description = "Words for scary places", UserId = 2 });
        }

        [Fact]
        public void Registered_User_Can_Get_Posts()
        {

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this User's posts
            var response = controller.GetByUserId();

            // Returns Ok
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void Anonymous_User_Can_Not_Get_Collections()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this User's collections
            var response = controller.GetByUserId();

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            // Verify we never called the repo method
            _fakeCollectionRepo.Verify(r => r.Get(It.IsAny<int>()), Times.Never());
        }

        [Fact]
        public void If_User_Has_No_Collections_Return_NotFound()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER3"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this User's collections
            var response = controller.GetByUserId();

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Get_Their_Collection_By_Id()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get this User's collection
            var response = controller.GetByCollectionId(1);

            // Returns Ok
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void User_Can_Not_Get_Collections_That_Are_Not_Theirs()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get this Someone else's collection
            var response = controller.GetByCollectionId(2);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void Anonymous_User_Can_Not_Get_Collection_By_Id()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get someone's collection
            var response = controller.GetByCollectionId(2);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            // Verify we never called the repo method
            _fakeCollectionRepo.Verify(r => r.GetByCollectionId(It.IsAny<int>()), Times.Never());
        }

        [Fact]
        public void Get_Collection_For_Id_Not_In_Db_Returns_Not_Found()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get this User's collection
            var response = controller.GetByCollectionId(666);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }


        [Fact]
        public void User_Can_Add_Collection()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Create a new collection
            Collection collection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "New stuff",
                Description = "New lame description.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this User's collections
            var response = controller.Add(collection);

            // Returns Ok
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void Anonymous_User_Can_Not_Add_Collection()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
                                   }, "TestAuthentication"));

            // Create a new collection
            Collection collection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "New stuff",
                Description = "New lame description.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            // Spoof UserController
            var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this User's collections
            var response = controller.Add(collection);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            // Verify we never called the repo method
            _fakeCollectionRepo.Verify(r => r.Add(It.IsAny<Collection>()), Times.Never());
        }
    }
}
