namespace todo_api.Shared;

/// <summary>
/// Represents a paginated result set using 1-based page numbering.
/// </summary>
public sealed class PagedResult<T>
{
    public IReadOnlyList<T> Items { get; init; } = [];

    /// <summary>
    /// Current page number (1-based).
    /// </summary>
    public int Page { get; init; }

    public int PageSize { get; init; }
    public int TotalCount { get; init; }

    /// <summary>
    /// Total number of pages based on <see cref="TotalCount"/> and <see cref="PageSize"/>.
    /// </summary>
    public int TotalPages =>
        (int)Math.Ceiling(TotalCount / (double)PageSize);
}
