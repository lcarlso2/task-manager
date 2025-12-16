using System.ComponentModel.DataAnnotations;

namespace todo_api.Dtos
{
    public class CreateTodoRequest
    {
        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(200)]
        public required string Title { get; init; }
    }
}
