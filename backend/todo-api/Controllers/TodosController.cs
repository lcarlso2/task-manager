using Microsoft.AspNetCore.Mvc;
using todo_api.Dtos;
using todo_api.Mapping;
using todo_api.Services;

namespace todo_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(ITodoService todoService) : ControllerBase
{

    // GET /api/todos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoResponse>>> GetAll()
    {
        var todos = await todoService.GetAllAsync();
        return Ok(todos.Select(t => t.ToResponse()));
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
    public async Task<IActionResult> Update(int id, UpdateTodoRequest request)
    {
        var updated = await todoService.UpdateAsync(id, request);
        if (!updated)
            return NotFound();

        return NoContent();
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
