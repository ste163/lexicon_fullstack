using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("project")]
    public class Project
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("userId")]
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }
        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Column("creationDate")]
        [Required]
        public DateTime CreationDate {get; set;} // Set by Database
    }
}
