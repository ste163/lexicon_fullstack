using Lexicon.Data;
using Lexicon.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Lexicon.Repositories
{
    public class WordRepository : IWordRepository
    {
        private readonly ApplicationDbContext _context;

        public WordRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(Word word)
        {
            _context.Add(word);
            _context.SaveChanges();
        }

        public void DeleteSingleWord(Word word)
        {
            _context.Remove(word);
            _context.SaveChanges();
        }

        public void DeleteAllWordsInCollection(List<Word> words)
        {
            _context.RemoveRange(words);
            _context.SaveChanges();
        }

        public Word GetWordById(int id)
        {
            return _context.Word
                .Include(w => w.User)
                .Include(w => w.Collection)
                .Where(w => w.CollectionId == id)
                .FirstOrDefault();
        }

        public List<Word> GetByCollectionId(int id)
        {
            return _context.Word
                .Include(w => w.User)
                .Include(w => w.Collection)
                .Where(w => w.CollectionId == id)
                .ToList();
        }
    }
}
