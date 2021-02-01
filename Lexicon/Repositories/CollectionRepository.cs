using Lexicon.Data;
using Lexicon.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                .Include(c => c.Categorization)
                .OrderByDescending(c => c.CreationDate)
                .Where(c => c.UserId == id)
                .ToList();
        }

        public void Add(Collection collection)
        {
            _context.Add(collection);
            _context.SaveChanges();
        }
    }
}
