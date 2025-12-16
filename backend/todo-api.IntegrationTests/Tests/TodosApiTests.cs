using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using todo_api.Dtos;
using Xunit;

namespace todo_api.IntegrationTests;

public class TodosApiTests
    : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public TodosApiTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

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
}
