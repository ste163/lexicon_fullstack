using Lexicon.Data;
using Lexicon.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Lexicon.Repositories
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly ApplicationDbContext _context;

        public CollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Collection> Get(int id)
        {
            return _context.Collection
                .Include(c => c.User)
                .Include(c => c.Categorization)
                .OrderByDescending(c => c.CreationDate)
                .Where(c => c.UserId == id)
                .ToList();
        }

        public Collection GetByCollectionId(int id)
        {
            return _context.Collection
                .Include(c => c.User)
                .Include(c => c.Categorization)
                .Where(c => c.Id == id)
                .FirstOrDefault();
        }

        public void Add(Collection collection)
        {
            _context.Add(collection);
            _context.SaveChanges();
        }

        public void Update(Collection collection)
        {
            _context.Update(collection);
            _context.SaveChanges();
        }

        public void Delete(Collection collection)
        {
            // When we start to get lists of words, etc. that need to be deleted first
            // do this (from Tabloid Posts that I did):
            //var commentsForPost = _context.Comment.Where(c => c.PostId == post.Id).ToList();
            //_context.Comment.RemoveRange(commentsForPost);
            //_context.SaveChanges();

            var projectCollectionsForCollection = _context.ProjectCollection.Where(c => c.CollectionId == collection.Id).ToList();
            _context.ProjectCollection.RemoveRange(projectCollectionsForCollection);
            _context.SaveChanges();

            // For now, because nothing else exists, a simple delete works:
            _context.Collection.Remove(collection);
            _context.SaveChanges();

        }
    }
}
