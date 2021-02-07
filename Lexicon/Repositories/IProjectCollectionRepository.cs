using Lexicon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public interface IProjectCollectionRepository
    {
        List<ProjectCollection> GetByCollectionId(int id);
        List<ProjectCollection> GetByProjectId(int id);
        void Add(List<ProjectCollection> projectCollections);
        void Delete(List<ProjectCollection> projectCollections);

        // Project and Collection controllers, always run the get ProjCol by Id
    }
}
