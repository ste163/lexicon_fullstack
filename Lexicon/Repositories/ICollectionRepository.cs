using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface ICollectionRepository
    {
        List<Collection> Get(int id);
        // Whenever I get by CollectionId, I want to ALSO get
            // Collection
            // List of all ProjectCollecitons
            // List of all Words
        // Which means I need a view model for GetByCollectionId
        Collection GetByCollectionId(int id);
        void Add(Collection collection);
        void Update(Collection collection);
        void Delete(Collection collection);
    }
}
