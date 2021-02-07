using Lexicon.Models;
using Lexicon.Models.ViewModels;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IProjectRepository
    {
        List<Project> Get(int id);
        ProjectDetailsViewModel GetByProjectId(int id);
        void Add(Project project);
        void Update(Project project);
        void Delete(ProjectDetailsViewModel projectDetails);
    }
}
