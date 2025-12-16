namespace todo_api.Dtos
{
    public class TodoResponse
    {
        public int Id { get; init; }
        public required string Title { get; init; } = string.Empty;
        public bool IsCompleted { get; init; }
        public DateTime CreatedAt { get; init; }
    }
}
