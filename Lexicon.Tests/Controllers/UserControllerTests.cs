using System;
using System.Collections.Generic;
using Moq;
using Xunit;
using Lexicon.Models;
using Lexicon.Repositories;
using Lexicon.Controllers;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// When doing Controller Unit Tests, you do NOT spoof the db
// because we never hit the database. We spoof Repositories by using their Interfaces
namespace Lexicon.Tests.Controllers
{
    public class UserControllerTests
    {

        private Mock<IUserRepository> _fakeUserRepo;

        public UserControllerTests()
        {
            // Spoof a User Repo
            _fakeUserRepo = new Mock<IUserRepository>();
            // Whenever this GetByFirebaseUserId is called, return user with Id 1
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER1")).Returns(new User() { Id = 1, Email = "pennywise@it.com" });
            // Whenever this GetByFirebaseUserId is called, return user with Id 2
            _fakeUserRepo.Setup(r => r.GetByFirebaseUserId("FIREBASE_USER2")).Returns(new User() { Id = 2, Email = "bobgray@it.com" });
        }

        [Fact]
        public void Only_User_Id_1_Can_Get_All_Users()
        {
            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Spoof UserController
            var controller = new UserController(_fakeUserRepo.Object);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Get all users
            var response = controller.GetAll();

            // Return Ok
            Assert.IsType<OkObjectResult>(response);
        }
    }
}
