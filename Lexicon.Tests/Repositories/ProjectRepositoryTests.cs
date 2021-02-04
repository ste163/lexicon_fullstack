using Lexicon.Models;
using Lexicon.Repositories;
using System;
using Xunit;

namespace Lexicon.Tests.Repositories
{
    class ProjectRepositoryTests : EFTestFixture
    {
        public ProjectRepositoryTests()
        {
            // Generate dummy data for in-memory db
            AddSampleData();
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

            var project1 = new Project()
            {
                UserId = 1,
                Name = "The Haunted House",
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            var project2 = new Project()
            {
                UserId = 1,
                Name = "Spooky Stories",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project3 = new Project()
            {
                UserId = 2,
                Name = "Under the Bed",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            var project4 = new Project()
            {
                UserId = 3,
                Name = "Big Untitled Story",
                CreationDate = DateTime.Now - TimeSpan.FromDays(5)
            };

            _context.Add(project1);
            _context.Add(project2);
            _context.Add(project3);
            _context.Add(project4);
            _context.SaveChanges();
        }
    }
}
