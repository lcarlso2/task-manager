using Microsoft.EntityFrameworkCore;
using todo_api.Data;
using todo_api.Dtos;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Shared;

namespace todo_api.Services;

public class TodoService(AppDbContext db) : ITodoService
{
    public async Task<PagedResult<Todo>> GetAllAsync(int page, int pageSize, TodoStatusFilter status, TodoSortFilter sort)
    {
        var query = db.Todos.AsNoTracking();

        query = status switch
        {
            TodoStatusFilter.Active => query.Where(t => !t.IsCompleted),
            TodoStatusFilter.Completed => query.Where(t => t.IsCompleted),
            _ => query
        };

        query = sort switch
        {
            TodoSortFilter.CreatedAsc => query.OrderBy(t => t.CreatedAt).ThenBy(t => t.Id),
            TodoSortFilter.TitleAsc => query.OrderBy(t => t.Title).ThenBy(t => t.Id),
            _ => query.OrderByDescending(t => t.CreatedAt).ThenByDescending(t => t.Id)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Todo>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
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

    public async Task<Todo?> UpdateAsync(int id, UpdateTodoRequest request)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
            return null;

        todo.Title = request.Title;
        todo.IsCompleted = request.IsCompleted;

        await db.SaveChangesAsync();
        return todo;
    }

    public async Task<Todo?> DeleteAsync(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
            return null;

        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return todo;
    }
}
