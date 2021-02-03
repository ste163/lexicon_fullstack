using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface ICollectionRepository
    {
        List<Collection> Get(int id);
        Collection GetByCollectionId(int id);
        void Add(Collection collection);
        void Update(Collection collection);
        void Delete(Collection collection);
    }
}
