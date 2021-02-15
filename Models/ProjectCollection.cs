using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("projectCollection")]
    public class ProjectCollection
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("projectId")]
        [Required]
        public int ProjectId { get; set; }

        public Project Project { get; set; }
        [Column("collectionId")]
        [Required]
        public int CollectionId { get; set; }

        public Collection Collection { get; set; }
    }
}
