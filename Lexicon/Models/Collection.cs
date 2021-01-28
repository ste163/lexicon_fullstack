using System;
using System.ComponentModel.DataAnnotations;

namespace Lexicon.Models
{
    public class Collection
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CategorizationId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public bool Pinned { get; set; }

        [Required]
        public DateTime CreationDate { get; set; } // Set by Database
    }
}
