using System;
using System.ComponentModel.DataAnnotations;

namespace Lexicon.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public DateTime CreationDate {get; set;} // Set by Database
    }
}
