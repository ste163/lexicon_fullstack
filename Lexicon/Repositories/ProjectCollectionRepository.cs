using Lexicon.Data;
using Lexicon.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Lexicon.Repositories
{
    public class ProjectCollectionRepository : IProjectCollectionRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectCollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(List<ProjectCollection> projectCollections)
        {
            _context.AddRange(projectCollections);
            _context.SaveChanges();
        }

        public void Delete(List<ProjectCollection> projectCollections)
        {
            _context.RemoveRange(projectCollections);
            _context.SaveChanges();
        }

        public List<ProjectCollection> GetByCollectionId(int id)
        {
            return _context.ProjectCollection
                .Include(pc => pc.Project)
                .Include(pc => pc.Collection)
                .Where(pc => pc.CollectionId == id)
                .ToList();
        }

        public List<ProjectCollection> GetByProjectId(int id)
        {
            return _context.ProjectCollection
                .Include(pc => pc.Project)
                .Include(pc => pc.Collection)
                .Where(pc => pc.ProjectId == id)
                .ToList();
        }
    }
}
