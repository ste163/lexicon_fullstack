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
using Lexicon.Models.ViewModels;

namespace Lexicon.Tests.Controllers
{
    public class WordControllerTests
    {
        private Mock<IUserRepository> _fakeUserRepo;
        private Mock<IWordRepository> _fakeWordRepo;

        public WordControllerTests()
        {
            // Spoof a User Repo
            _fakeUserRepo = new Mock<IUserRepository>();
            // Whenever this GetByFirebaseUserId is called, return user
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER1")).Returns(new User() { Id = 1, Email = "pennywise@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER2")).Returns(new User() { Id = 2, Email = "bobgray@it.com" });
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER3")).Returns(new User() { Id = 3, Email = "mikehanlon@it.com" });

            // Spoof a Word Repo
            _fakeWordRepo = new Mock<IWordRepository>();
            // Whenever we enter these CollectionIds, return these word lists
            _fakeWordRepo.Setup(r => r.GetByCollectionId(It.Is<int>(i => i == 1))).Returns((int id) => new List<Word>() { new Word() { Id = 1, MwWordId = 123, UserId = 1, Name = " Scary" }, new Word() { Id = 2, MwWordId = 1234, UserId = 1, Name = "Monsters" } });
            _fakeWordRepo.Setup(r => r.GetByCollectionId(It.Is<int>(i => i == 2))).Returns((int id) => new List<Word>() { new Word() { Id = 3, MwWordId = 321, UserId = 2, Name = "Swampy" }, new Word() { Id = 4, MwWordId = 4321, UserId = 2, Name = "Spooky" } });
            _fakeWordRepo.Setup(r => r.GetByCollectionId(It.Is<int>(i => i == 3))).Returns((int id) => null);
            _fakeWordRepo.Setup(r => r.GetWordById(It.Is<int>(i => i == 1))).Returns((int id) => new Word() { Id = 1, MwWordId = 123, UserId = 1, Name = " Scary" });
            _fakeWordRepo.Setup(r => r.GetWordById(It.Is<int>(i => i == 2))).Returns((int id) => new Word() { Id = 2, MwWordId = 123, UserId = 1, Name = " Spooky" });
        }



        // GET
        [Fact]
        public void Registered_User_Can_Get_Their_Words()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof WordController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get words
            var response = controller.GetAllWordsByCollectionId(1);

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

            // Spoof WordController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this words collections
            var response = controller.GetAllWordsByCollectionId(1);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            // Verify we never called the repo method
            _fakeWordRepo.Verify(r => r.GetByCollectionId(It.IsAny<int>()), Times.Never());
        }

        [Fact]
        public void If_User_Has_No_Words_Return_Not_Found()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER3"),
                                   }, "TestAuthentication"));

            // Spoof WordController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this words collections
            var response = controller.GetAllWordsByCollectionId(3);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void User_Can_Only_Get_Their_Words()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof WordController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this words collections
            var response = controller.GetAllWordsByCollectionId(2);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }

        [Fact]
        public void Get_By_Collection_Not_In_Db_Return_Not_Found()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof WordController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get this words collections
            var response = controller.GetAllWordsByCollectionId(99999);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
        }


        // ADD
        [Fact]
        public void User_Can_Add_Word_To_Collection()
        {
            // Get a collection Id to add to
            var collectionId = 1;
            
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // create a new Word
            var word = new Word()
            {
                UserId = 1,
                CollectionId = collectionId,
                MwWordId = 12345,
            };

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to add word
            var response = controller.Add(collectionId, word);

            // Returns Ok
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void Anonymous_User_Can_Not_Add()
        {
            // Get a collection Id to add to
            var collectionId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
                                   }, "TestAuthentication"));

            // create a new Word
            var word = new Word()
            {
                UserId = 1,
                CollectionId = collectionId,
                MwWordId = 12345,
            };

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to add word
            var response = controller.Add(collectionId, word);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            _fakeWordRepo.Verify(r => r.Add(It.IsAny<Word>()), Times.Never());
        }

        [Fact]
        public void If_UserId_On_Word_And_Requesting_User_Do_Not_Match_Do_Not_Add()
        {
            // Get a collection Id to add to
            var collectionId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // create a new Word
            var word = new Word()
            {
                UserId = 2,
                CollectionId = collectionId,
                MwWordId = 12345,
            };

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to add word
            var response = controller.Add(collectionId, word);

            // Returns Ok
            Assert.IsType<BadRequestResult>(response);
            _fakeWordRepo.Verify(r => r.Add(It.IsAny<Word>()), Times.Never());
        }

        [Fact]
        public void If_CollectionId_Does_Not_Match_Word_Collection_Id_Do_Not_Add()
        {
            // Get a collection Id to add to
            var collectionId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // create a new Word
            var word = new Word()
            {
                UserId = 1,
                CollectionId = 2,
                MwWordId = 12345,
            };

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to to add word
            var response = controller.Add(collectionId, word);

            // Returns Ok
            Assert.IsType<BadRequestResult>(response);
            _fakeWordRepo.Verify(r => r.Add(It.IsAny<Word>()), Times.Never());
        }

        [Fact]
        public void If_MwWordId_Is_Already_In_Collection_Do_Not_Add()
        {
            // Get a collection Id to add to
            var collectionId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // create a new Word
            var word = new Word()
            {
                UserId = 1,
                CollectionId = collectionId,
                MwWordId = 1234, // Already in db
            };

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to add word
            var response = controller.Add(collectionId, word);

            // Returns Ok
            Assert.IsType<BadRequestResult>(response);
            _fakeWordRepo.Verify(r => r.Add(It.IsAny<Word>()), Times.Never());
        }



        // DELETE
        [Fact]
        public void Can_Delete_A_Word()
        {
            // Get a word Id to remove
            var wordId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get single word
            var response = controller.DeleteSingleWord(wordId);

            // Returns Ok
            Assert.IsType<NoContentResult>(response);
        }

        [Fact]
        public void Anonymous_User_Can_Not_Delete()
        {
            // Get a word Id to remove
            var wordId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER666"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get single word
            var response = controller.DeleteSingleWord(wordId);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            _fakeWordRepo.Verify(r => r.DeleteSingleWord(It.IsAny<Word>()), Times.Never());
        }

        [Fact]
        public void Word_Must_Be_In_Db_To_Delete()
        {
            // Get a word Id to remove
            var wordId = 999;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get single word
            var response = controller.DeleteSingleWord(wordId);

            // Returns Ok
            Assert.IsType<NotFoundResult>(response);
            _fakeWordRepo.Verify(r => r.DeleteSingleWord(It.IsAny<Word>()), Times.Never());
        }

        [Fact]
        public void Only_Word_Owner_Can_Delete_Word()
        {
            // Get a word Id to remove
            var wordId = 1;

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER2"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new WordController(_fakeUserRepo.Object, _fakeWordRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get single word
            var response = controller.DeleteSingleWord(wordId);

            // Returns Ok
            Assert.IsType<BadRequestResult>(response);
            _fakeWordRepo.Verify(r => r.DeleteSingleWord(It.IsAny<Word>()), Times.Never());
        }
    }
}
