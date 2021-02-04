using System.ComponentModel.DataAnnotations;

namespace Lexicon.Models
{
    public class Categorization
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Type { get; set; }
    }
}
