using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared
{
    public static class ApiProblems
    {
        public static ProblemDetails InvalidPagination(int page, int pageSize)
            => new()
            {
                Title = "Invalid pagination parameters",
                Detail = $"Page must be >= {PaginationRules.DefaultPage} and pageSize must be between {PaginationRules.MinPageSize} and {PaginationRules.MaxPageSize}. (page={page}, pageSize={pageSize})",
                Status = StatusCodes.Status400BadRequest
            };
    }
}
