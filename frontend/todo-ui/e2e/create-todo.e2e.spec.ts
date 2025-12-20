import { test, expect } from "@playwright/test";

// Verify persistence via backend to avoid false positives from future
// optimistic UI updates or client-side caching changes
test("e2e: todo creation persists in backend and renders in UI", async ({
  page,
}) => {
  const title = `e2e-${Date.now()}`;

  await page.goto("/");

  const textarea = page.getByPlaceholder("New todo");
  await textarea.fill(title);
  await textarea.press("Enter");

  const apiResponse = await page.request.get("http://localhost:5280/api/todos");
  expect(apiResponse.ok()).toBe(true);

  const data = await apiResponse.json();
  expect(data.items.some((t: { title: string }) => t.title === title)).toBe(
    true
  );

  await page.reload();
  await expect(page.getByText(title)).toBeVisible();
});
