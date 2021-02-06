using Lexicon.Data;
using Lexicon.Models;
using Lexicon.Models.ViewModels;
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

        public CollectionDetailsViewModel GetByCollectionId(int id)
        {
            var collection = _context.Collection
                    .Include(c => c.User)
                    .Include(c => c.Categorization)
                    .Where(c => c.Id == id)
                    .FirstOrDefault();

            var projectCollections = _context.ProjectCollection
                    .Where(pc => pc.CollectionId == id)
                    .ToList();

            var words = _context.Word
                    .Where(w => w.CollectionId == id)
                    .ToList();

            return new CollectionDetailsViewModel
            {
                Collection = collection,
                ProjectCollections = projectCollections,
                Words = words
            };
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

        public void Delete(CollectionDetailsViewModel collectionDetails)
        {
            _context.ProjectCollection.RemoveRange(collectionDetails.ProjectCollections);
            _context.SaveChanges();

            // For now, because nothing else exists, a simple delete works:
            _context.Collection.Remove(collectionDetails.Collection);
            _context.SaveChanges();

        }
    }
}
