using Microsoft.EntityFrameworkCore;
using todo_api.Data;
using todo_api.Dtos;
using todo_api.Entities;

namespace todo_api.Services;

public class TodoService(AppDbContext db) : ITodoService
{
    public async Task<List<Todo>> GetAllAsync()
    {
        return await db.Todos
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(int id)
    {
        return await db.Todos
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }
    public async Task<Todo> CreateAsync(CreateTodoRequest request)
    {
        var todo = new Todo
        {
            Title = request.Title,
            IsCompleted = false
        };

        db.Todos.Add(todo);
        await db.SaveChangesAsync();

        return todo;
    }

    public async Task<bool> UpdateAsync(int id, UpdateTodoRequest request)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
            return false;

        todo.Title = request.Title;
        todo.IsCompleted = request.IsCompleted;

        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
            return false;

        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return true;
    }
}
