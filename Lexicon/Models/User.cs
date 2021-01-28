using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lexicon.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(255)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public List<Collection> Collections { get; set; }
        public List<Project> Projects { get; set; }

    }
}
