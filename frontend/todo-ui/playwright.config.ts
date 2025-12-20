import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },

  webServer: [
    {
      command:
        "dotnet run --launch-profile e2e  --project ../../backend/todo-api",
      port: 5280,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      port: 5173,
      reuseExistingServer: !process.env.CI,
      env: {
        ...process.env,
        VITE_API_BASE_URL: "http://localhost:5280/api",
      },
    },
  ],
});
