using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("word")]
    public class Word
    {
        public int Id { get; set;}

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int CollectionId { get; set; }

        public Collection Collection { get; set; }

        [Required]
        public string MwWordId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // LastViewed updates every time the user views the definition card
        // as long as it isn't by clicking on it from their Selected Collection card
        [Required]
        public DateTime LastViewed { get; set; } 
    }
}
