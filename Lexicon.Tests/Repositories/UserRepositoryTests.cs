using Lexicon.Models;
using Lexicon.Repositories;
using System;
using System.Collections.Generic;
using Tabloid_Fullstack.Tests;
using Xunit;

namespace Lexicon.Tests.Repositories
{
    public class UserRepositoryTests : EFTestFixture
    {
        public UserRepositoryTests()
        {
            // When constructed, add dummy data to in-memory database
            AddSampleData();
        }

        [Fact]
        public void Can_Get_All_Users()
        {
            //Instantiate UserRepo
            var repo = new UserRepository(_context);

            // Get a count of all users
            var userCount = repo.Get().Count;

            // We should have 1 user
            Assert.True(userCount == 1);
        }

        [Fact]
        public void User_Can_Register()
        {
            // Create a new User
            var user = new User
            {
                Email = "bobgray@it.com",
                FirebaseUserId = "TEST_FIREBASE_UID_2"
            };

            // Instantiate UserRepo
            var repo = new UserRepository(_context);

            // Get count of all users
            var originalUserCount = repo.Get().Count; // will need to add a Get all for testing

            // Attempt to add user
            repo.Add(user);

            // Get user count after addition
            var postUserCount = repo.Get().Count;

            // We should have more posts than before
            Assert.True(postUserCount > originalUserCount);
        }




        [Fact]
        public void Users_Can_Delete_Themselves_Only()
        {
            //// Create a new Post to delete
            //var post = new Post
            //{
            //    Title = "Ween, a band, that's really good",
            //    Content = "Everyone should listen to Ween. They're a pretty fun band. The End.",
            //    ImageLocation = "Ween is like---totally---cool",
            //    PublishDateTime = DateTime.Now - TimeSpan.FromDays(10),
            //    IsApproved = true,
            //    CategoryId = 2,
            //    UserProfileId = 3
            //};

            //// Get our PostRepo
            //var repo = new PostRepository(_context);

            //// Add that Post to Db
            //repo.Add(post);

            //// Get a count of all posts
            //var postTotal = repo.Get().Count;

            //// Delete just added post
            //repo.Delete(post);

            //// Get a new count of all posts;
            //var postTotalAfterDeletion = repo.Get().Count;

            //// Post total after deletion should be one less than original total
            //Assert.True(postTotalAfterDeletion == postTotal - 1);
        }

        private void AddSampleData()
        {
            var user1 = new User()
            {
                Email = "pennywise@it.com",
                FirebaseUserId = "TEST_FIREBASE_UID_1"
            };

            _context.Add(user1);
            _context.SaveChanges();
        }
    }
}
