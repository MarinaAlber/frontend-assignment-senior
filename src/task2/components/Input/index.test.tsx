import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import Input, { TInput } from ".";
import { lightTheme } from "../../theme";

const renderInput = (props: TInput) => {
  return render(<Input {...props} />);
};

describe("Input Component", () => {
  // Add 1 or 2 positive and 1 or 2 negative tests
  it("show text input with the light theme", () => {
    const { getByRole } = renderInput({
      padding: "sm",
      value: "",
      onChange: () => {},
      placeholder: "Search...",
    });
    const input = getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({
      padding: lightTheme.sizes["sm"],
      borderRadius: lightTheme.borderRadius,
      color: lightTheme.colors.primary[9],
    });
  });

  it("calls the onChange function with the new value when typing", () => {
    const initialValue = "Initial value";
    const onChangeMock = vi.fn();
    const { getByRole } = renderInput({
      value: initialValue,
      onChange: onChangeMock,
    });

    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(onChangeMock).toHaveBeenCalledWith("New value");
  });

  it("calls the onChange function with the no value when typing text in type number", () => {
    const initialValue = "Initial value";
    const onChangeMock = vi.fn();
    const { getByRole } = renderInput({
      value: initialValue,
      onChange: onChangeMock,
      type: "number",
    });

    const inputElement = getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(onChangeMock).not.toHaveBeenCalledWith("New value");
    expect(onChangeMock).toHaveBeenCalledWith("");
  });
});
