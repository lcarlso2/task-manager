using todo_api.Dtos;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Shared;

namespace todo_api.Services
{
    public interface ITodoService
    {

        /// <summary>
        /// Get all todos using pagination, filtering, and sorting.
        /// </summary>
        /// <param name="page">1-based page number</param>
        /// <param name="pageSize">Number of items per page</param>
        /// <param name="status">
        /// Status filter; use <see cref="TodoStatusFilter.All"/> to include all todos.
        /// </param>
        /// <param name="sort">Sort order for the result set</param>
        /// <returns>A paged result of todos</returns>
        Task<PagedResult<Todo>> GetAllAsync(
            int page,
            int pageSize,
            TodoStatusFilter status,
            TodoSortFilter sort,
            CancellationToken token);

        /// <summary>
        /// Get a single todo by id.
        /// </summary>
        /// <param name="id">Todo id</param>
        /// <returns>Todo if found, otherwise null</returns>
        Task<Todo?> GetByIdAsync(int id, CancellationToken token);

        /// <summary>
        /// Create a new todo.
        /// </summary>
        /// <param name="request">Todo creation request</param>
        /// <returns>Created Todo</returns>
        Task<Todo> CreateAsync(CreateTodoRequest request, CancellationToken token);

        /// <summary>
        /// Update an existing todo.
        /// </summary>
        /// <param name="id">Id of the todo to update</param>
        /// <param name="request">Update request</param>
        /// <returns>Updated todo if updated, null if not found</returns>
        Task<Todo?> UpdateAsync(int id, UpdateTodoRequest request, CancellationToken token);

        /// <summary>
        /// Delete a todo by id.
        /// </summary>
        /// <param name="id">Id of the todo to delete</param>
        /// <returns>Deleted todo if deleted, null if not found</returns>
        Task<Todo?> DeleteAsync(int id, CancellationToken token);
    }
}
