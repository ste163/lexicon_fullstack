using System.Collections.Generic;

namespace Lexicon.Models.ViewModels
{
    public class ProjectFormViewModel
    {
        public Project Project { get; set; }
        public List<ProjectCollection> ProjectCollections { get; set; }
    }
}
