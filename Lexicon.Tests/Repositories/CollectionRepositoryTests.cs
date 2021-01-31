using Lexicon.Models;
using Lexicon.Repositories;
using System;
using Xunit;

namespace Lexicon.Tests.Repositories
{
    public class CollectionRepositoryTests : EFTestFixture
    {
        public CollectionRepositoryTests()
        {
            // When constructed, add dummy data to in-memory database
            AddSampleData();
        }

        [Fact]
        public void User_Can_Get_Their_Collections()
        {
            // Get a userId
            int userId = 1;

            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Get count of all collections
            var collectionCount = repo.Get(userId).Count;

            // User with Id 1 should have 2
            Assert.True(collectionCount == 2);
        }

        [Fact]
        public void User_Can_Add_Collection()
        {

        }

        [Fact]
        public void User_Can_Delete_A_Single_Collection()
        {

        }

        [Fact]
        public void User_Can_Edit_A_Collection()
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
                Name = "Alphabetical"
            };

            var categorization2 = new Categorization()
            {
                Name = "Part of Speech"
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
