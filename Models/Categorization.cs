using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lexicon.Models
{
    [Table("categorization")]
    public class Categorization
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Type { get; set; }
    }
}
