using Microsoft.EntityFrameworkCore

namespace seylan_firsst_app_backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }  //This will represent the Users table in the database
    }
}
