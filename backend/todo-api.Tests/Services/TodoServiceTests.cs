using FluentAssertions;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using todo_api.Data;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Services;
using Xunit;

namespace todo_api.Tests.Services
{
    public class TodoServiceTests
    {
        private static AppDbContext CreateDbContext()
        {
            // SQLite in-memory ensures real Skip/Take behavior
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(connection)
                .Options;

            var context = new AppDbContext(options);
            context.Database.EnsureCreated();

            return context;
        }

        [Fact]
        public async Task GetAllAsync_returns_correct_page_items_and_total_count()
        {
            // Arrange
            using var context = CreateDbContext();
            var service = new TodoService(context);

            var todos = Enumerable.Range(1, 25).Select(i => new Todo
            {
                Title = $"Todo {i}",
                IsCompleted = false,
            });

            context.Todos.AddRange(todos);
            await context.SaveChangesAsync();

            // Act
            var result = await service.GetAllAsync(
                page: 2,
                pageSize: 10,
                status: TodoStatusFilter.All,
                sort: TodoSortFilter.TitleAsc
            );

            // Assert
            result.Should().NotBeNull();
            result.Page.Should().Be(2);
            result.PageSize.Should().Be(10);
            result.TotalCount.Should().Be(25);

            result.Items.Should().HaveCount(10);
            result.Items.First().Title.Should().Be("Todo 19");
            result.Items.Last().Title.Should().Be("Todo 4");
        }
    }
}
