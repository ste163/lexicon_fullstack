using Lexicon.Models;
using Lexicon.Repositories;
using System;
using System.Collections.Generic;
using Xunit;


namespace Lexicon.Tests.Repositories
{
    public class ProjectCollectionRepositoryTests : EFTestFixture
    {
        public ProjectCollectionRepositoryTests()
        {
            // Generate dummy data for in-memory db
            AddSampleData();
        }



        // GET
        [Fact]
        public void Can_Get_All_Related_To_A_Collection_Id()
        {
            // Get a valid Collection Id (only valid Ids will ever get to the repo anyway)
            var id = 1;

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get count of all projects
            var count = repo.GetByCollectionId(id).Count;

            // Should have retrieved two items
            Assert.True(count == 2);
        }

        [Fact]
        public void Can_Get_All_Related_To_A_Project_Id()
        {
            // Get a valid Project Id (only valid Ids will ever get to the repo anyway)
            var id = 1;

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get count of all projects
            var count = repo.GetByProjectId(id).Count;

            // Should have retrieved two items
            Assert.True(count == 2);
        }

        [Fact]
        public void If_No_Joined_Proj_Coll_Return_Empty_List()
        {
            // Get a valid Project Id without any items
            var id = 4;

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get result of all projects
            var result = repo.GetByProjectId(id);

            // Should return an empty list
            Assert.Empty(result);
        }



        // ADD
        [Fact]
        public void Can_Add_Multiple_Items_At_Once()
        {
            // Get a ProjectId to add
            var projId = 4;

            // Make two ProjectCollections
            var newProjCol1 = new ProjectCollection()
            {
                ProjectId = projId,
                CollectionId = 1,
            };

            var newProjCol2 = new ProjectCollection()
            {
                ProjectId = projId,
                CollectionId = 2,
            };

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get a count of collections in Project
            var originalCount = repo.GetByProjectId(projId).Count;

            // Add Items to List
            var projectCollections = new List<ProjectCollection>()
            {
                newProjCol1,
                newProjCol2
            };

            // Add items
            repo.Add(projectCollections);

            // Get new count
            var newCount = repo.GetByProjectId(projId).Count;

            // New count should be +2 original
            Assert.True(newCount == originalCount + 2);
        }

        [Fact]
        public void Can_Add_Single_Item()
        {
            // Get a ProjectId to add
            var projId = 4;

            // Make two ProjectCollections
            var newProjCol1 = new ProjectCollection()
            {
                ProjectId = projId,
                CollectionId = 1,
            };

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get a count of collections in Project
            var originalCount = repo.GetByProjectId(projId).Count;

            // Add Items to List
            var projectCollections = new List<ProjectCollection>()
            {
                newProjCol1,
            };

            // Add items
            repo.Add(projectCollections);

            // Get new count
            var newCount = repo.GetByProjectId(projId).Count;

            // New count should be +2 original
            Assert.True(newCount == originalCount + 1);
        }

        // I had a test for a user can not add to the same join twice, but from the add
        // that would be impossible. The collection hasn't been created, so it's Id is unique in db.
        // On the Edit I will do a check. These will be two good integration test.

        // DELETE
        [Fact]
        public void Can_Delete_Multiple_Items_At_Once()
        {
            // Get proj id to delete items from
            var projId = 1;

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get projCol
            var projCol = repo.GetByProjectId(projId);

            // Get original counts
            var originalCount = repo.GetByCollectionId(projId).Count;

            // Add Items to List
            var projectCollections = new List<ProjectCollection>()
            {
                projCol[0],
                projCol[1]
            };

            // Add items
            repo.Delete(projectCollections);

            // Get new count
            var newCount = repo.GetByProjectId(projId).Count;

            //New count should be -2 original
            Assert.True(newCount == originalCount - 2);
        }

        [Fact]
        public void Can_Delete_Single_Item()
        {
            // Get proj id to delete items from
            var projId = 1;

            // Instantiate ProjectCollection Repo
            var repo = new ProjectCollectionRepository(_context);

            // Get projCol
            var projCol = repo.GetByProjectId(projId);

            // Get original counts
            var originalCount = repo.GetByCollectionId(projId).Count;

            // Add Item to List
            var projectCollections = new List<ProjectCollection>()
            {
                projCol[0]
            };

            // Add items
            repo.Delete(projectCollections);

            // Get new count
            var newCount = repo.GetByProjectId(projId).Count;

            //New count should be -1 original
            Assert.True(newCount == originalCount - 1);
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
                UserId = 2,
                Name = "Snake Skins",
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            _context.Add(project1);
            _context.Add(project2);
            _context.Add(project3);
            _context.Add(project4);
            _context.SaveChanges();

            var categorization1 = new Categorization()
            {
                Type = "Alphabetical"
            };

            var categorization2 = new Categorization()
            {
                Type = "Part of Speech"
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
                UserId = 2,
                CategorizationId = 1,
                Name = "Basements",
                Description = "Nobody likes them.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            _context.Add(collection1);
            _context.Add(collection2);
            _context.Add(collection3);
            _context.Add(collection4);
            _context.SaveChanges();

            var projectCollection1 = new ProjectCollection()
            {
                ProjectId = 1,
                CollectionId = 1
            };

            var projectCollection2 = new ProjectCollection()
            {
                ProjectId = 1,
                CollectionId = 2
            };

            var projectCollection3 = new ProjectCollection()
            {
                ProjectId = 2,
                CollectionId = 1
            };

            var projectCollection4 = new ProjectCollection()
            {
                ProjectId = 2,
                CollectionId = 2
            };

            _context.Add(projectCollection1);
            _context.Add(projectCollection2);
            _context.Add(projectCollection3);
            _context.Add(projectCollection4);
            _context.SaveChanges();
        }
    }
}
