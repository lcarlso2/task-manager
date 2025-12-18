using todo_api.Dtos;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Shared;

namespace todo_api.Services
{
    public interface ITodoService
    {

        /// <summary>
        /// Get alls todos based on filter params
        /// </summary>
        /// <param name="page">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="status">Status of todo</param>
        /// <param name="sort">Sort order of todo</param>
        /// <returns></returns>
        Task<PagedResult<Todo>> GetAllAsync(int page, int pageSize, TodoStatusFilter status, TodoSortFilter sort);

        /// <summary>
        /// Get a single todo by id.
        /// </summary>
        /// <param name="id">Todo id</param>
        /// <returns>Todo if found, otherwise null</returns>
        Task<Todo?> GetByIdAsync(int id);

        /// <summary>
        /// Create a new todo.
        /// </summary>
        /// <param name="request">Todo creation request</param>
        /// <returns>The created Todo</returns>
        Task<Todo> CreateAsync(CreateTodoRequest request);

        /// <summary>
        /// Update an existing todo.
        /// </summary>
        /// <param name="id">Id of the todo to update</param>
        /// <param name="request">Update request</param>
        /// <returns>The updated todo if updated, null if not found</returns>
        Task<Todo?> UpdateAsync(int id, UpdateTodoRequest request);

        /// <summary>
        /// Delete a todo by id.
        /// </summary>
        /// <param name="id">Id of the todo to delete</param>
        /// <returns>True if deleted, false if not found</returns>
        Task<bool> DeleteAsync(int id);
    }
}
