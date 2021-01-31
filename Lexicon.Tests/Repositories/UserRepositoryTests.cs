using Lexicon.Models;
using Lexicon.Repositories;
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
            // Instantiate UserRepo
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
                FirebaseUserId = "FIREBASE_ID_2"
            };

            // Instantiate UserRepo
            var repo = new UserRepository(_context);

            // Get count of all users
            var originalUserCount = repo.Get().Count;

            // Attempt to add user
            repo.Add(user);

            // Get user count after addition
            var postUserCount = repo.Get().Count;

            // We should have more posts than before
            Assert.True(postUserCount > originalUserCount);
        }

        [Fact]
        public void Users_Can_Be_Deleted()
        {
            var user = new User()
            {
                Email = "soonToBeDeleted@email.com",
                FirebaseUserId = "FIREBASE_ID_POOF!"
            };

            // Instantiate UserRepo
            var repo = new UserRepository(_context);

            // Add new User
            repo.Add(user);

            // Get count of all users
            var originalUserCount = repo.Get().Count;

            // Delete added user
            repo.Delete(user);

            // Get a new count of all posts;
            var usersTotalPostDeletion = repo.Get().Count;

            // Post total after deletion should be one less than original total
            Assert.True(usersTotalPostDeletion == originalUserCount - 1);
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
