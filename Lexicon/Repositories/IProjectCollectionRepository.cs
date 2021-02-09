using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IProjectCollectionRepository
    {
        List<ProjectCollection> GetByCollectionId(int id);
        List<ProjectCollection> GetByProjectId(int id);
        void Add(List<ProjectCollection> projectCollections);
        void Delete(List<ProjectCollection> projectCollections);
    }
}
