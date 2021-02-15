using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("categorization")]
    public class Categorization
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("type")]
        [Required]
        [MaxLength(255)]
        public string Type { get; set; }
    }
}
