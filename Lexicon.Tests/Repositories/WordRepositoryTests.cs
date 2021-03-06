﻿using Lexicon.Models;
using Lexicon.Repositories;
using System;
using System.Collections.Generic;
using Xunit;

namespace Lexicon.Tests.Repositories
{
    public class WordRepositoryTests : EFTestFixture
    {
        public WordRepositoryTests()
        {
            // Generate dummy data for in-memory db
            AddSampleData();
        }



        // GET
        [Fact]
        public void Can_Get_All_Words_By_Collection()
        {
            // Get a valid Collection Id 
            var id = 1;

            // Instantiate Word Repo
            var repo = new WordRepository(_context);

            // Get count of all words
            var count = repo.GetByCollectionId(id).Count;

            // Should have retrieved three items
            Assert.True(count == 3);
        }

        [Fact]
        public void Can_Get_Single_Word_By_Id()
        {
            // Get a valid Word Id
            var id = 1;

            // Instantiate Word Repo
            var repo = new WordRepository(_context);

            // Get count of all words
            var word = repo.GetWordById(id);

            // Should have retrieved word with name of "Vampire"
            Assert.True(word.Name == "Vampire");
        }



        // ADD
        [Fact]
        public void Can_Add_Word()
        {
            // Get a CollectionId to add to
            var collectionId = 2;

            // Make word
            var word = new Word()
            {
                UserId = 1,
                CollectionId = 2,
                MwWordId = "12345",
                Name = "Added",
                LastViewed = DateTime.Now - TimeSpan.FromDays(15)
            };

            // Instantiate Word Repo
            var repo = new WordRepository(_context);

            // Get a count of words in Collection
            var originalCount = repo.GetByCollectionId(collectionId).Count;

            // Add items
            repo.Add(word);

            // Get new count
            var newCount = repo.GetByCollectionId(collectionId).Count;

            // New count should be +1 original
            Assert.True(newCount == originalCount + 1);
        }



        // DELETE
        [Fact]
        public void Can_Delete_Single_Word()
        {
            // Get a CollectionId to remove from
            var collectionId = 1;

            // Instantiate Word Repo
            var repo = new WordRepository(_context);

            // Get a count of words in Collection
            var originalCount = repo.GetByCollectionId(collectionId).Count;

            // Get the words from the Collection
            var words = repo.GetByCollectionId(collectionId);

            // Delete word
            repo.DeleteSingleWord(words[0]);

            // Get new count
            var newCount = repo.GetByCollectionId(collectionId).Count;

            // New count should be -1 original
            Assert.True(newCount == originalCount - 1);
        }

        [Fact]
        public void Can_Delete_All_Words_From_Collection()
        {
            // Get a CollectionId to remove from
            var collectionId = 1;

            // Instantiate Word Repo
            var repo = new WordRepository(_context);

            // Get a count of words in Collection
            var originalCount = repo.GetByCollectionId(collectionId).Count;

            // Get the words from the Collection
            var words = repo.GetByCollectionId(collectionId);

            // Delete all words
            repo.DeleteAllWordsInCollection(words);

            // Get new count
            var newCount = repo.GetByCollectionId(collectionId).Count;

            // New count should be -1 original
            Assert.True(newCount == originalCount - 3);
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

            var word1 = new Word()
            {
                UserId = 1,
                CollectionId = 1,
                MwWordId = "12345",
                Name = "Scares",
                LastViewed = DateTime.Now - TimeSpan.FromDays(15)
            };

            var word2 = new Word()
            {
                UserId = 1,
                CollectionId = 1,
                MwWordId = "12345",
                Name = "Zombie",
                LastViewed = DateTime.Now - TimeSpan.FromDays(15)
            };

            var word3 = new Word()
            {
                UserId = 1,
                CollectionId = 1,
                MwWordId = "12345",
                Name = "Werewolf",
                LastViewed = DateTime.Now - TimeSpan.FromDays(15)
            };

            var word4 = new Word()
            {
                UserId = 1,
                CollectionId = 2,
                MwWordId = "12345",
                Name = "Vampire",
                LastViewed = DateTime.Now - TimeSpan.FromDays(15)
            };

            _context.Add(word1);
            _context.Add(word2);
            _context.Add(word3);
            _context.Add(word4);
            _context.SaveChanges();
        }
    }
}
