using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("word")]
    public class Word
    {
        [Column("id")]
        public int Id { get; set;}
        [Column("userId")]
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
        [Column("collectionId")]
        [Required]
        public int CollectionId { get; set; }

        public Collection Collection { get; set; }
        [Column("mwWordId")]
        [Required]
        public string MwWordId { get; set; }
        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Column("lastViewed")]
        [Required]
        public DateTime LastViewed { get; set; } 
    }
}
