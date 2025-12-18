using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared
{
    public static class TodoProblems
    {
        public static ProblemDetails NotFound(int id)
            => new()
            {
                Title = "Todo not found",
                Detail = $"Todo with id {id} does not exist.",
                Status = StatusCodes.Status404NotFound
            };
    }
}
