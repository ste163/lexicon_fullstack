using System.Collections.Generic;

namespace Lexicon.Models.ViewModels
{
    public class CollectionDetailsViewModel
    {
        public Collection Collection { get; set; }
        public List<ProjectCollection> ProjectCollections { get; set; }
        public List<Word> Words { get; set; }
    }
}
