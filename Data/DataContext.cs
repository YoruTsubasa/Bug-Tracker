using Bug_Tracker.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Bug_Tracker.Data;

public class DataContext : DbContext
{
    public DataContext()
    {
        
    }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<SuperHero> SuperHeroes => Set<SuperHero>();
    public DbSet<User> Users => Set<User>();
}