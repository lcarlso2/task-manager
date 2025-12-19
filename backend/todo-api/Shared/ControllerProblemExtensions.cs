using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared;

/// <summary>
/// Controller extensions for returning standardized API error responses.
/// </summary>
public static class ControllerProblemExtensions
{
    /// <summary>
    /// Returns a 400 Bad Request response for invalid pagination parameters
    /// using the standard API problem format.
    /// </summary>
    public static ActionResult InvalidPagination(
        this ControllerBase controller,
        int page,
        int pageSize)
        => controller.BadRequest(
            ApiProblems.InvalidPagination(page, pageSize));

    /// <summary>
    /// Returns a 404 Not Found response for a missing todo
    /// using the standard API problem format.
    /// </summary>
    public static ActionResult TodoNotFound(
        this ControllerBase controller,
        int id)
        => controller.NotFound(
            TodoProblems.NotFound(id));
}
