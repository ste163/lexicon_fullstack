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

            // Spoof a Word Repo
            _fakeWordRepo = new Mock<IWordRepository>();
            // Whenever we enter these CollectionIds, return these word lists
            _fakeWordRepo.Setup(r => r.GetByCollectionId(It.Is<int>(i => i == 1))).Returns((int id) => new List<Word>() { new Word() { Id = 1, UserId = 1, Name = " Scary" }, new Word() { Id = 2, UserId = 1, Name = "Monsters" } });
            _fakeWordRepo.Setup(r => r.GetByCollectionId(It.Is<int>(i => i == 2))).Returns((int id) => new List<Word>() { new Word() { Id = 3, UserId = 2, Name = "Swampy" }, new Word() { Id = 4, UserId = 2, Name = "Spooky" } });
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

            // Attempt to Get this User's posts
            var response = controller.GetAllWordsByCollectionId(1);

            // Returns Ok
            Assert.IsType<OkObjectResult>(response);
        }
    }
}
