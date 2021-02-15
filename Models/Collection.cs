using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("collection")]
    public class Collection
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("userId")]
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
        [Column("categorizationId")]
        [Required]
        public int CategorizationId { get; set; }

        public Categorization Categorization { get; set; }
        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Column("description")]
        [MaxLength(255)]
        public string Description { get; set; }
        [Column("pinned")]
        [Required]
        public bool Pinned { get; set; }
        [Column("creationDate")]
        [Required]
        public DateTime CreationDate { get; set; } // Set by Database
    }
}
