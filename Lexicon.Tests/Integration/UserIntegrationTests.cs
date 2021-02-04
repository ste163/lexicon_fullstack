using Lexicon.Controllers;
using Lexicon.Models;
using Lexicon.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Xunit;

namespace Lexicon.Tests.Integration
{
    // For the Integration tests, will need to Spoof user credentials and the Db
    public class UserIntegrationTests : EFTestFixture
    {
        public UserIntegrationTests()
        {
            AddSampleData();
        }


        [Fact]
        public void Only_Unique_Emails_Can_Register()
        {
            // Create a User with a unique Email
            var userToAdd = new User()
            {
                Email = "mikeHanlon@it.com",
                FirebaseUserId = "FIREBASE_ID_2"
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Instantiate a real UserRepo
            var repo = new UserRepository(_context);

            // Instantiate a real UserController, passing in UserRepo
            var controller = new UserController(repo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add user
            var response = controller.Post(userToAdd);

            // Adding should return that it's been created
            Assert.IsType<CreatedAtActionResult>(response);
        }

        [Fact]
        public void Non_Unique_Emails_Fail()
        {
            // Create a User with an Email already in db
            var userToAdd = new User()
            {
                Email = "pennywise@it.com",
                FirebaseUserId = "FIREBASE_ID_2"
            };

            // Spoof an authenticated user by generating a ClaimsPrincipal
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                                   new Claim(ClaimTypes.NameIdentifier, "FIREBASE_USER1"),
                                   }, "TestAuthentication"));

            // Instantiate a real UserRepo
            var repo = new UserRepository(_context);

            // Instantiate a real UserController, passing in UserRepo
            var controller = new UserController(repo);
            controller.ControllerContext = new ControllerContext(); // Required to create the controller
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user }; // Pretend the user is making a request to the controller

            // Attempt to Add user
            var response = controller.Post(userToAdd);

            // Adding should return a NotFound because Email is already in db
            Assert.IsType<NotFoundResult>(response);
        }

        private void AddSampleData()
        {
            var user1 = new User()
            {
                Email = "pennywise@it.com",
                FirebaseUserId = "FIREBASE_ID_1"
            };

            _context.Add(user1);
            _context.SaveChanges();
        }
    }
}
