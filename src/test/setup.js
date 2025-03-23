import "@testing-library/jest-dom";
import { vi } from "vitest";

// Fix for React's useState in vitest
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: vi
      .fn()
      .mockImplementation((initialValue) => [initialValue, vi.fn()]),
  };
});
