using Microsoft.AspNetCore.Mvc;

namespace todo_api.Shared
{
    public static class ControllerProblemExtensions
    {
        public static ActionResult InvalidPagination(
         this ControllerBase controller,
         int page,
         int pageSize)
         => controller.BadRequest(
             ApiProblems.InvalidPagination(page, pageSize));

        public static ActionResult TodoNotFound(
            this ControllerBase controller,
            int id)
            => controller.NotFound(
                TodoProblems.NotFound(id));
    }
}
