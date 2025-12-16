using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using todo_api.Entities;

namespace todo_api.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Todo> Todos => Set<Todo>();
    }
}
