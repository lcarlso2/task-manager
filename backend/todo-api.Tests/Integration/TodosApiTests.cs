using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Json;
using todo_api.Dtos;
using Xunit;

namespace todo_api.Tests.Integration;

public class TodosApiTests(CustomWebApplicationFactory factory)
        : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Create_and_get_todo_returns_expected_result()
    {
        var createRequest = new CreateTodoRequest
        {
            Title = "Integration test todo"
        };

        var createResponse = await _client.PostAsJsonAsync(
            "/api/todos", createRequest);

        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);

        var createdTodo =
            await createResponse.Content.ReadFromJsonAsync<TodoResponse>();

        createdTodo.Should().NotBeNull();
        createdTodo!.Title.Should().Be("Integration test todo");
        createdTodo.IsCompleted.Should().BeFalse();

        var getResponse = await _client.GetAsync(
            $"/api/todos/{createdTodo.Id}");

        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var fetchedTodo =
            await getResponse.Content.ReadFromJsonAsync<TodoResponse>();

        fetchedTodo.Should().NotBeNull();
        fetchedTodo!.Id.Should().Be(createdTodo.Id);
        fetchedTodo.Title.Should().Be(createdTodo.Title);
    }

    [Fact]
    public async Task Get_unknown_todo_returns_404_problem_details()
    {
        var unknownId = 999_999;

        var response = await _client.GetAsync($"/api/todos/{unknownId}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        var problem =
            await response.Content.ReadFromJsonAsync<ProblemDetails>();

        problem.Should().NotBeNull();
        problem!.Status.Should().Be(StatusCodes.Status404NotFound);
        problem.Title.Should().NotBeNullOrWhiteSpace();
    }
}
