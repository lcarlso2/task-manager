import { test, expect } from "@playwright/test";

test("e2e: creating a todo persists and is retrievable", async ({ page }) => {
  // Use a unique title so the test is idempotent with a static DB
  const title = `e2e-${Date.now()}`;

  await page.goto("/");

  // Create todo via UI
  const textarea = page.getByPlaceholder("New todo");
  await expect(textarea).toBeVisible();

  await textarea.fill(title);
  await textarea.press("Enter");

  // Assert UI updated
  await expect(page.getByText(title)).toBeVisible();

  // Verify persistence via backend API (independent of UI state)
  const response = await page.request.get("http://localhost:5280/api/todos");
  expect(response.ok()).toBe(true);

  const data = await response.json();
  expect(data.items.some((t: { title: string }) => t.title === title)).toBe(
    true
  );
});
