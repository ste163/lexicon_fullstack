using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Models
{
    public class Categorization
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string CategorizationType { get; set; }
    }
}
