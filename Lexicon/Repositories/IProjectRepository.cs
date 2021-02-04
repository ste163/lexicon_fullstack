using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IProjectRepository
    {
        List<Project> Get(int id);
        Project GetByProjectId(int id);
        void Add(Project project);
        void Update(Project project);
        void Delete(Project project);
    }
}
