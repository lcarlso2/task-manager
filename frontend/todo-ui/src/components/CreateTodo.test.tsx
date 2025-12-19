import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CreateTodo } from "./CreateTodo";

vi.mock("../hooks", () => ({
  useCreateTodo: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("CreateTodo", () => {
  it("shows an error when submitting an empty title via Enter", async () => {
    const user = userEvent.setup();
    render(<CreateTodo />);

    const textarea = screen.getByPlaceholderText("New todo");

    await user.click(textarea);
    await user.keyboard("{Enter}");

    expect(
      screen.getByText("Title cannot be empty")
    ).toBeInTheDocument();
  });
});
