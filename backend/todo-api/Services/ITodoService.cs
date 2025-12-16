using todo_api.Dtos;
using todo_api.Entities;

namespace todo_api.Services
{
    public interface ITodoService
    {
        /// <summary>
        /// Get all todos.
        /// </summary>
        /// <returns>List of Todo</returns>
        Task<List<Todo>> GetAllAsync();

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
        /// <returns>True if updated, false if not found</returns>
        Task<bool> UpdateAsync(int id, UpdateTodoRequest request);

        /// <summary>
        /// Delete a todo by id.
        /// </summary>
        /// <param name="id">Id of the todo to delete</param>
        /// <returns>True if deleted, false if not found</returns>
        Task<bool> DeleteAsync(int id);
    }
}
