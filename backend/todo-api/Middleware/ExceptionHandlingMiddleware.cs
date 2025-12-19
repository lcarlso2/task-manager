using System.Net;
using System.Text.Json;

namespace todo_api.Middleware;

/// <summary>
/// Middleware that catches unhandled exceptions and returns a consistent
/// JSON error response instead of allowing the request to crash.
/// </summary>
/// <remarks>
/// This acts as a final safety net for unexpected failures. Known errors
/// should be handled explicitly closer to the request pipeline.
/// </remarks>
public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger)
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

            // Return a generic 500 response to avoid leaking internal details
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = new
            {
                error = "An unexpected error occurred.",
                traceId = context.TraceIdentifier
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
    }
}
