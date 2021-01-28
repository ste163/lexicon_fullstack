using System.ComponentModel.DataAnnotations;

namespace Lexicon.Models
{
    public class ProjectCollection
    {
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        public Project Project { get; set; }

        [Required]
        public int CollectionId { get; set; }

        public Collection Collection { get; set; }
    }
}
