using Microsoft.AspNetCore.Mvc;
using todo_api.Dtos;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Mapping;
using todo_api.Services;
using todo_api.Shared;

namespace todo_api.Controllers;

/// <summary>
/// Manages CRUD operations for todos.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TodosController(ITodoService todoService) : ControllerBase
{
    /// <summary>
    /// Returns a paginated list of todos.
    /// </summary>
    /// <param name="page">1-based page number</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="status">Filter by todo status</param>
    /// <param name="sort">Sort order</param>
    /// <returns>A paged list of todos</returns>
    /// <response code="200">Todos returned successfully</response>
    /// <response code="400">Invalid pagination parameters</response>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<TodoResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PagedResult<TodoResponse>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] TodoStatusFilter status = TodoStatusFilter.All,
        [FromQuery] TodoSortFilter sort = TodoSortFilter.CreatedDesc)
    {
        if (!PaginationRules.IsValid(page, pageSize))
        {
            return this.InvalidPagination(page, pageSize);
        }

        var result = await todoService.GetAllAsync(page, pageSize, status, sort);

        return Ok(new PagedResult<TodoResponse>
        {
            Items = [.. result.Items.Select(x => x.ToResponse())],
            Page = result.Page,
            PageSize = result.PageSize,
            TotalCount = result.TotalCount
        });
    }

    /// <summary>
    /// Returns a single todo by id.
    /// </summary>
    /// <param name="id">Todo identifier</param>
    /// <response code="200">Todo found</response>
    /// <response code="404">Todo not found</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TodoResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TodoResponse>> GetById(int id)
    {
        var todo = await todoService.GetByIdAsync(id);
        if (todo is null)
        {
            return this.TodoNotFound(id);
        }

        return Ok(todo.ToResponse());
    }

    /// <summary>
    /// Creates a new todo.
    /// </summary>
    /// <param name="request">Todo creation payload</param>
    /// <response code="201">Todo created successfully</response>
    /// <response code="400">Validation failed</response>
    [HttpPost]
    [ProducesResponseType(typeof(TodoResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TodoResponse>> Create(CreateTodoRequest request)
    {
        var todo = await todoService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = todo.Id },
            todo.ToResponse()
        );
    }

    /// <summary>
    /// Updates an existing todo.
    /// </summary>
    /// <param name="id">Todo identifier</param>
    /// <param name="request">Updated todo values</param>
    /// <response code="200">Todo updated successfully</response>
    /// <response code="404">Todo not found</response>
    /// <response code="400">Validation failed</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(TodoResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TodoResponse>> Update(int id, UpdateTodoRequest request)
    {
        var updated = await todoService.UpdateAsync(id, request);
        if (updated is null)
        {
            return this.TodoNotFound(id);
        }

        return Ok(updated.ToResponse());
    }

    /// <summary>
    /// Deletes a todo.
    /// </summary>
    /// <param name="id">Todo identifier</param>
    /// <response code="204">Todo deleted successfully</response>
    /// <response code="404">Todo not found</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await todoService.DeleteAsync(id);
        if (todo is null)
        {
            return this.TodoNotFound(id);
        }

        return NoContent();
    }
}
