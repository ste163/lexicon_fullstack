using System.Collections.Generic;

namespace Lexicon.Models.ViewModels
{
    public class ProjectDetailsViewModel
    {
        public Project Project { get; set; }
        public List<ProjectCollection> ProjectCollections { get; set; }
    }
}
