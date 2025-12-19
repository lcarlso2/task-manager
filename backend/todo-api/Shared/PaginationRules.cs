namespace todo_api.Shared;

/// <summary>
/// Defines global pagination defaults and validation rules used by the API.
/// </summary>
/// <remarks>
/// Page numbering is 1-based. Validation is expected to occur at the API boundary.
/// </remarks>
public static class PaginationRules
{
    public const int DefaultPage = 1;
    public const int DefaultPageSize = 20;
    public const int MinPageSize = 1;
    public const int MaxPageSize = 100;

    /// <summary>
    /// Validates pagination parameters against the defined rules.
    /// </summary>
    public static bool IsValid(int page, int pageSize)
        => page >= DefaultPage
        && pageSize >= MinPageSize
        && pageSize <= MaxPageSize;
}
