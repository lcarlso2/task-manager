using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared;

/// <summary>
/// Centralized helpers for generating consistent API error responses.
/// </summary>
public static class ApiProblems
{
    /// <summary>
    /// Creates a standardized ProblemDetails response for invalid pagination parameters.
    /// </summary>
    public static ProblemDetails InvalidPagination(int page, int pageSize)
        => new()
        {
            Title = "Invalid pagination parameters",
            Detail =
                $"Page must be >= {PaginationRules.DefaultPage} and pageSize must be between " +
                $"{PaginationRules.MinPageSize} and {PaginationRules.MaxPageSize}. " +
                $"(page={page}, pageSize={pageSize})",
            Status = StatusCodes.Status400BadRequest
        };
}
