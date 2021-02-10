using Lexicon.Models;
using Lexicon.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Lexicon.Models.ViewModels;

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

        public ProjectDetailsViewModel GetByProjectId(int id)
        {
            var project =  _context.Project
                    .Include(c => c.User)
                    .Where(c => c.Id == id)
                    .FirstOrDefault();

            var projectCollections = _context.ProjectCollection
                    .Include(pc => pc.Collection)
                    .Where(pc => pc.ProjectId == id)
                    .ToList();

            return new ProjectDetailsViewModel
            {
                Project = project,
                ProjectCollections = projectCollections
            };
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

        public void Delete(ProjectDetailsViewModel projectDetails)
        {
            _context.ProjectCollection.RemoveRange(projectDetails.ProjectCollections);
            _context.SaveChanges();

            _context.Project.Remove(projectDetails.Project);
            _context.SaveChanges();
        }
    }
}
