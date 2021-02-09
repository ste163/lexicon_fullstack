using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IWordRepository
    {
        // This might be completely unneeded.
        // Model should probably axe the UserId because they're connected by CollectionId.
        //List<Word> GetByUserId(int id);
        List<Word> GetByCollectionId(int id);
        void Add(Word word);
        void Delete(Word word);
        void DeleteAllWordsInCollection(List<Word> words);
    }
}
