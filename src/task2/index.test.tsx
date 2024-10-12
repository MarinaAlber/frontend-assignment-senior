import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Task2 from ".";

describe("Task2 Component", () => {
  // Add 1 or 2 positive and 1 or 2 negative tests
  it("should render components", () => {
    const { getByRole , getByTestId, getByText } = render(<Task2 />);

    expect(getByText("Primary Test Button")).toBeInTheDocument();
    expect(getByText("Secondary Test Button")).toBeInTheDocument();
    expect(getByTestId("card")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
