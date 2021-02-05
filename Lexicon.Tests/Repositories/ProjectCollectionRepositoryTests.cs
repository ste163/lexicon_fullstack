using Lexicon.Models;
using Lexicon.Repositories;
using System;
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

        }

        [Fact]
        public void Can_Get_All_Related_To_A_Project_Id()
        {

        }

        [Fact]
        public void If_No_Joined_Proj_Coll_Return_Nothing()
        {

        }



        // ADD
        [Fact]
        public void Can_Add_Multiple_Items_At_Once()
        {

        }

        [Fact]
        public void Can_Add_Single_Item()
        {

        }



        // DELETE
        [Fact]
        public void Can_Delete_Multiple_Items_At_Once()
        {

        }

        [Fact]
        public void Can_Delete_Single_Item()
        {

        }



        private void AddSampleData()
        {
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
