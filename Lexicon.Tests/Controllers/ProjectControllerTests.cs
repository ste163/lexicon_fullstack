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
    public class ProjectControllerTests
    {
        private Mock<IUserRepository> _fakeUserRepo;
        private Mock<IProjectRepository> _fakeProjectRepo;

        public ProjectControllerTests()
        {
            // Spoof a User Repo
            _fakeUserRepo = new Mock<IUserRepository>();
            // Whenever this GetByFirebaseUserId is called, return user with Id 1
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER1")).Returns(new User() { Id = 1, Email = "pennywise@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER2")).Returns(new User() { Id = 2, Email = "bobgray@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER3")).Returns(new User() { Id = 3, Email = "mikehanlon@it.com" });

            // Spoof a Project Repo
            // You do not have to have the full object coming back with all the required NOT NULL, etc.
            // We are not faking a db, just the items that would come out of it.
            _fakeProjectRepo = new Mock<IProjectRepository>();
            // Whenever a user with this Id calls the Get method, return this list of projects
            _fakeProjectRepo.Setup(r => r.Get(It.Is<int>(i => i == 1))).Returns((int id) => new List<Project>() { new Project() { Id = 1, Name = "It" }, new Project() { Id = 2, Name = "The Dark Half" } });
            _fakeProjectRepo.Setup(r => r.Get(It.Is<int>(i => i == 2))).Returns((int id) => new List<Project>() { new Project() { Id = 1, Name = "The Dead Zone" }, new Project() { Id = 2, Name = "The Shining", } });
            // Whenever we enter Id 1, return this object
            _fakeProjectRepo.Setup(r => r.GetByProjectId(1)).Returns(new Project() { Id = 1, Name = "The Dead Zone", UserId = 1 });
            _fakeProjectRepo.Setup(r => r.GetByProjectId(2)).Returns(new Project() { Id = 1, Name = "It", UserId = 2 });
        }

        //// GET TESTS
        //[Fact]
        //public void Registered_User_Can_Get_Collections()
        //{

        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's posts
        //    var response = controller.GetByUserId();

        //    // Returns Ok
        //    Assert.IsType<OkObjectResult>(response);
        //}

        //[Fact]
        //public void Anonymous_User_Can_Not_Get_Collections()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.GetByUserId();

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //    // Verify we never called the repo method
        //    _fakeCollectionRepo.Verify(r => r.Get(It.IsAny<int>()), Times.Never());
        //}

        //[Fact]
        //public void If_User_Has_No_Collections_Return_NotFound()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER3"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.GetByUserId();

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}

        //[Fact]
        //public void User_Can_Get_Their_Collection_By_Id()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to get this User's collection
        //    var response = controller.GetByCollectionId(1);

        //    // Returns Ok
        //    Assert.IsType<OkObjectResult>(response);
        //}

        //[Fact]
        //public void User_Can_Not_Get_Collections_That_Are_Not_Theirs()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to get this Someone else's collection
        //    var response = controller.GetByCollectionId(2);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}

        //[Fact]
        //public void Anonymous_User_Can_Not_Get_Collection_By_Id()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to get someone's collection
        //    var response = controller.GetByCollectionId(2);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //    // Verify we never called the repo method
        //    _fakeCollectionRepo.Verify(r => r.GetByCollectionId(It.IsAny<int>()), Times.Never());
        //}

        //[Fact]
        //public void Get_Collection_For_Id_Not_In_Db_Returns_Not_Found()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to get this User's collection
        //    var response = controller.GetByCollectionId(666);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}



        //// ADD TESTS
        //[Fact]
        //public void User_Can_Add_Collection()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Create a new collection
        //    Collection collection = new Collection()
        //    {
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Add(collection);

        //    // Returns Ok
        //    Assert.IsType<OkObjectResult>(response);
        //}

        //[Fact]
        //public void Anonymous_User_Can_Not_Add_Collection()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
        //                           }, "TestAuthentication"));

        //    // Create a new collection
        //    Collection collection = new Collection()
        //    {
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Add(collection);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //    // Verify we never called the repo method
        //    _fakeCollectionRepo.Verify(r => r.Add(It.IsAny<Collection>()), Times.Never());
        //}



        //// UPDATE TESTS
        //[Fact]
        //public void Collection_Owner_Can_Update()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Make a fake collection to update, based on a spoofed one
        //    Collection collection = new Collection()
        //    {
        //        Id = 1,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Use the matching Id
        //    var collectionParamId = 1;

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Put(collectionParamId, collection);

        //    // Returns Ok
        //    Assert.IsType<NoContentResult>(response);
        //}

        //[Fact]
        //public void Anonymous_User_Can_Not_Update()
        //{
        //    // Spoof an anonymous user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
        //                           }, "TestAuthentication"));

        //    // Make a fake collection to update, based on a spoofed one
        //    Collection collection = new Collection()
        //    {
        //        Id = 1,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Use the matching Id
        //    var collectionParamId = 1;

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Put(collectionParamId, collection);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}

        //[Fact]
        //public void If_Id_Param_and_Collection_Id_Do_Not_Match_Do_Not_Update()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Make a fake collection to update, based on a spoofed one
        //    Collection collection = new Collection()
        //    {
        //        Id = 1,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Use a non-matching Id
        //    var collectionParamId = 2;

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Put(collectionParamId, collection);

        //    // Returns Ok
        //    Assert.IsType<BadRequestResult>(response);
        //}

        //[Fact]
        //public void If_A_Collection_Is_Not_In_Db_Do_Not_Attempt_Update()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Make a fake collection to update
        //    Collection collection = new Collection()
        //    {
        //        Id = 666,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Use a not real collection to update
        //    var collectionParamId = 666;

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Put(collectionParamId, collection);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}

        //[Fact]
        //public void If_This_Collection_To_Update_Is_Not_Mine_Do_Not_Update()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER2"),
        //                           }, "TestAuthentication"));

        //    // Make a fake collection to update
        //    Collection collection = new Collection()
        //    {
        //        Id = 1,
        //        UserId = 1,
        //        CategorizationId = 1,
        //        Name = "New stuff",
        //        Description = "New lame description.",
        //        Pinned = false,
        //        CreationDate = DateTime.Now - TimeSpan.FromDays(10)
        //    };

        //    // Use a matching Id
        //    var collectionParamId = 1;

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to Get this User's collections
        //    var response = controller.Put(collectionParamId, collection);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //}





        //// DELETE TESTS
        //[Fact]
        //public void Anonymous_User_Can_Not_Delete()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to get someone's collection
        //    var response = controller.Delete(2);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //    // Verify we never called the repo method
        //    _fakeCollectionRepo.Verify(r => r.Delete(It.IsAny<Collection>()), Times.Never());
        //}

        //[Fact]
        //public void Collection_To_Delete_Must_Be_In_Db()
        //{
        //    // Spoof an authenticated user by generating a ClaimsPrincipal
        //    var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
        //                           new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
        //                           }, "TestAuthentication"));

        //    // Spoof UserController
        //    var controller = new CollectionController(_fakeUserRepo.Object, _fakeCollectionRepo.Object);
        //    controller.ControllerContext = new ControllerContext(); // Required to create the controller
        //    controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

        //    // Attempt to delete an item that is not in the db
        //    var response = controller.Delete(666);

        //    // Returns Ok
        //    Assert.IsType<NotFoundResult>(response);
        //    // Verify we never called the repo method
        //    _fakeCollectionRepo.Verify(r => r.Delete(It.IsAny<Collection>()), Times.Never());
        //}

        [Fact]
        public void Project_Owner_Can_Delete_Project()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER2"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new ProjectController(_fakeUserRepo.Object, _fakeProjectRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get this user's project
            var response = controller.Delete(2);

            // Returns Ok
            Assert.IsType<NoContentResult>(response);
        }

        [Fact]
        public void Project_NonOwner_Can_Not_Delete_Project()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new ProjectController(_fakeUserRepo.Object, _fakeProjectRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to get someone's else's project
            var response = controller.Delete(2);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            // Verify we never called the repo method
            _fakeProjectRepo.Verify(r => r.Delete(It.IsAny<Project>()), Times.Never());
        }
    }
}
