using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Models
{
    public class Word
    {
        public int Id { get; set;}

        [Required]
        public int CollectionId { get; set; }

        [Required]
        public int MwWordId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // LastViewed updates every time the user views the definition card
        // as long as it isn't by clicking on it from their Selected Collection card
        [Required]
        public DateTime LastViewed { get; set; } 
    }
}
