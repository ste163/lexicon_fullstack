using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IWordRepository
    {
        Word GetWordById(int id);
        List<Word> GetByCollectionId(int id);
        void Add(Word word);
        void DeleteSingleWord(Word word);
        void DeleteAllWordsInCollection(List<Word> words);
    }
}
