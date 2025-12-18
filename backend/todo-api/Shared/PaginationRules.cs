namespace todo_api.Shared
{
    public static class PaginationRules
    {
        public const int DefaultPage = 1;
        public const int DefaultPageSize = 20;
        public const int MinPageSize = 1;
        public const int MaxPageSize = 100;

        public static bool IsValid(int page, int pageSize)
            => page >= DefaultPage
            && pageSize >= MinPageSize
            && pageSize <= MaxPageSize;
    }
}
