using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using todo_api.Data;

namespace todo_api.Tests.Integration;

/// <summary>
/// Custom WebApplicationFactory used for integration tests.
/// Configures an in-memory SQLite database with real EF Core migrations
/// to exercise the full data access stack.
/// </summary>
public class CustomWebApplicationFactory
    : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Replace the production DbContext with an in-memory SQLite database
            var descriptor = services.Single(
                d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

            services.Remove(descriptor);

            var connection = new SqliteConnection("Data Source=:memory:");
            connection.Open();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(connection);
            });

            // Apply migrations so tests run against the real schema
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        });
    }
}
