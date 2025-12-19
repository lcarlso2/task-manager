using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared;

/// <summary>
/// Domain-specific API problem responses for Todo resources.
/// </summary>
public static class TodoProblems
{
    /// <summary>
    /// Creates a standardized 404 Not Found response for a missing todo.
    /// </summary>
    public static ProblemDetails NotFound(int id)
        => new()
        {
            Title = "Todo not found",
            Detail = $"Todo with id {id} does not exist.",
            Status = StatusCodes.Status404NotFound
        };
}
