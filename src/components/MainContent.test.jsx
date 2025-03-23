import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import MainContent from "./MainContent";

// Mock the HelpArea component with __esModule flag for proper ES modules handling
vi.mock("./HelpArea", () => ({
  __esModule: true,
  default: () => <div data-testid="help-area">Mocked Help Area</div>,
}));

describe("MainContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render a button", () => {
    render(<MainContent />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show the help area after clicking the button", async () => {
    // For userEvent v14+
    const user = userEvent.setup();

    render(<MainContent />);
    const button = screen.getByRole("button");

    // Click the button
    await user.click(button);

    // Add a small delay to ensure React state updates have time to process
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Now verify the help area is visible
    expect(screen.getByTestId("help-area")).toBeInTheDocument();
  });
});
