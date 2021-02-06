using Lexicon.Models;
using Lexicon.Models.ViewModels;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface ICollectionRepository
    {
        List<Collection> Get(int id);
        CollectionDetailsViewModel GetByCollectionId(int id);
        void Add(Collection collection);
        void Update(Collection collection);
        void Delete(Collection collection);
    }
}
