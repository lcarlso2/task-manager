using System.ComponentModel.DataAnnotations;

namespace todo_api.Entities
{
    public class Todo
    {
        public int Id { get; set; }
        [MaxLength(200)]
        public required string Title { get; set; } = default!;
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    }
}
