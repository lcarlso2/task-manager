using Microsoft.AspNetCore.Mvc;
using todo_api.Dtos;
using todo_api.Entities;
using todo_api.Enums;
using todo_api.Mapping;
using todo_api.Services;
using todo_api.Shared;

namespace todo_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(ITodoService todoService) : ControllerBase
{

    // GET /api/todos
    [HttpGet]
    public async Task<ActionResult<PagedResult<TodoResponse>>> GetAll(
      [FromQuery] int page = 1,
      [FromQuery] int pageSize = 20,
      [FromQuery] TodoStatusFilter status = TodoStatusFilter.All,
      [FromQuery] TodoSortFilter sort = TodoSortFilter.CreatedAsc)
    {
        if (page < 1 || pageSize < 1 || pageSize > 100)
        {
            return BadRequest("Invalid pagination parameters");
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

    // GET /api/todos/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<TodoResponse>> GetById(int id)
    {
        var todo = await todoService.GetByIdAsync(id);
        if (todo is null)
            return NotFound();

        return Ok(todo.ToResponse());
    }

    // POST /api/todos
    [HttpPost]
    public async Task<ActionResult<TodoResponse>> Create(CreateTodoRequest request)
    {
        var todo = await todoService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = todo.Id },
            todo.ToResponse()
        );
    }

    // PUT /api/todos/{id}
    [HttpPut("{id:int}")]
    public async Task<ActionResult<TodoResponse>> Update(int id, UpdateTodoRequest request)
    {
        var updated = await todoService.UpdateAsync(id, request);
        if (updated == null)
            return NotFound();

        return Ok(updated.ToResponse());
    }

    // DELETE /api/todos/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await todoService.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
