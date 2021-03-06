﻿using Lexicon.Models;
using Lexicon.Models.ViewModels;
using Lexicon.Repositories;
using System;
using System.Collections.Generic;
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



        // GET
        [Fact]
        public void User_Can_Get_Their_Collections()
        {
            // Get a userId
            int userId = 1;

            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Get count of all collections
            var count = repo.Get(userId).Count;

            // User with Id 1 should have 2
            Assert.True(count == 2);
        }

        [Fact]
        public void User_Can_Get_A_Single_Collection_By_Id()
        {
            // Set an expected collection to get that's in the db
            var expectedCollection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Categorization = new Categorization() { Id = 1, Type = "Part of Speech" },
                Name = "Monsters",
                Description = "Monsters and related words It becomes.",
                Pinned = false
            };

            // Get a Collection Id that is in the Db
            int collectionId = 3;

            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Get Collection by its Id
            var actualCollection = repo.GetByCollectionId(collectionId);

            // Two objects should have the same name. Was unable to test if Assert.Equal because Repo returns all the Objects from the FKs
            Assert.True(expectedCollection.Name == actualCollection.Collection.Name);
        }



        // ADD
        [Fact]
        public void User_Can_Add_Collection()
        {
            // Get a userId
            int userId = 1;

            // Create a new collection
            Collection collection = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "New stuff",
                Description = "New lame description.",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(10)
            };

            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Add collection
            repo.Add(collection);

            // Get new count of all collections
            var count = repo.Get(userId).Count;

            // User with Id 1 should have 3
            Assert.True(count == 3);
        }



        // UPDATE/EDIT
        [Fact]
        public void User_Can_Edit_Collection()
        {
            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Get an Collection from the Db
            var collectionToUpdate = repo.GetByCollectionId(1);

            collectionToUpdate.Collection.Name = "You GOT UPDATED!";
            collectionToUpdate.Collection.Description = "AND YOU GOT UPDATED!";

            // Attempt to update
            repo.Update(collectionToUpdate.Collection);

            // Retrieve item from db to see if updates occurred
            var updatedCollection = repo.GetByCollectionId(1);

            // The new names should match
            Assert.True(updatedCollection.Collection.Name == collectionToUpdate.Collection.Name);
        }




        // DELETE
        [Fact]
        public void User_Can_Delete_Collection()
        {
            // Get an object that's in the database
            var collectionToAdd = new Collection()
            {
                UserId = 1,
                CategorizationId = 1,
                Name = "New Collection to Axe",
                Description = "Blah",
                Pinned = false,
                CreationDate = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Add collectionToAdd to collectionDetailsVm
            var collectionDetails = new CollectionDetailsViewModel
            {
                Collection = collectionToAdd,
                ProjectCollections = new List<ProjectCollection>(),
                Words = new List<Word>()
            };

            // Instantiate CollectionRepo
            var repo = new CollectionRepository(_context);

            // Get a count of Collections for UserId 1
            var count = repo.Get(1).Count;

            // Add new collection
            repo.Add(collectionToAdd);

            // Get a new count
            var countAfterAdd = repo.Get(1).Count;

            // Attempt to delete the collection
            repo.Delete(collectionDetails);

            // New count after deleting
            var countAfterDeletion = repo.Get(1).Count;

            // We successfully added one collection
            Assert.True(count < countAfterAdd);
            // We successfully deleted one collection
            Assert.True(count == countAfterDeletion);
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
