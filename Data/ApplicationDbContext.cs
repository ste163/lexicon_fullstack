using Lexicon.Models;
using Microsoft.EntityFrameworkCore;

namespace Lexicon.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Word> Word { get; set; }
        public DbSet<ProjectCollection> ProjectCollection { get; set; }
        public DbSet<Collection> Collection { get; set; }
        public DbSet<Categorization> Categorization { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<User> User { get; set; }
    }
}


