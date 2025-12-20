using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace todo_api.Middleware;

/// <summary>
/// Middleware that catches unhandled exceptions and returns a consistent
/// ProblemDetails error response instead of allowing the request to crash.
/// </summary>
/// <remarks>
/// This acts as a final safety net for unexpected failures. Known errors
/// should be handled explicitly closer to the request pipeline.
/// </remarks>
public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger,
    IWebHostEnvironment env)
{
    /// <summary>
    /// Invokes the next middleware and handles any unhandled exceptions.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            // Log full exception details for diagnostics
            logger.LogError(ex, "Unhandled exception");

            var traceId = Activity.Current?.Id ?? context.TraceIdentifier;

            var problem = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "An unexpected error occurred",
                Type = "https://httpstatuses.com/500",
                Instance = context.Request.Path
            };

            // Only include exception details in Development
            if (env.IsDevelopment())
            {
                problem.Detail = ex.Message;
            }

            problem.Extensions["traceId"] = traceId;

            context.Response.StatusCode = problem.Status.Value;
            context.Response.ContentType = "application/problem+json";

            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}
