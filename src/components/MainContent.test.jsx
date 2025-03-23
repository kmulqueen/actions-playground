import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import MainContent from "./MainContent";

// Mock the HelpArea component
vi.mock("./HelpArea", () => ({
  default: () => <div data-testid="help-area">Mocked Help Area</div>,
}));

describe("MainContent", () => {
  beforeEach(() => {
    // Clear any previous mocks between tests
    vi.clearAllMocks();
  });

  it("should render a button", () => {
    render(<MainContent />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show the help area after clicking the button", async () => {
    const user = userEvent.setup();
    render(<MainContent />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByTestId("help-area")).toBeInTheDocument();
  });
});
