using todo_api.Dtos;
using todo_api.Entities;

namespace todo_api.Mapping
{
    public static class TodoMapping
    {
        public static TodoResponse ToResponse(this Todo todo)
        {
            return new TodoResponse
            {
                Id = todo.Id,
                Title = todo.Title,
                IsCompleted = todo.IsCompleted,
                CreatedAt = todo.CreatedAt
            };
        }
    }
}
