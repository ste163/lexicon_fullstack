using Lexicon.Models;
using Lexicon.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Lexicon.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Project> Get(int id)
        {
            return _context.Project
                .OrderByDescending(c => c.CreationDate)
                .Where(c => c.UserId == id)
                .ToList();
        }

        public Project GetByProjectId(int id)
        {
            return _context.Project
                .Include(c => c.User)
                .Where(c => c.Id == id)
                .FirstOrDefault();
        }

        public void Add(Project project)
        {
            _context.Add(project);
            _context.SaveChanges();
        }

        public void Update(Project project)
        {
            _context.Update(project);
            _context.SaveChanges();
        }

        public void Delete(Project project)
        {
            // Will need to delete from ProjectCollection join table before deleting these
            // do this (from Tabloid Posts that I did):
            //var commentsForPost = _context.Comment.Where(c => c.PostId == post.Id).ToList();
            //_context.Comment.RemoveRange(commentsForPost);
            //_context.SaveChanges();

            _context.Project.Remove(project);
            _context.SaveChanges();
        }
    }
}
