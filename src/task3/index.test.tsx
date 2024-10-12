import { describe, it, expect } from "vitest";
import { TFormSlice } from "./store/slice";
import { renderWithProviders } from "./utils/test-utils";
import Task3 from ".";
import { fireEvent } from "@testing-library/react";

describe("Task3 Component", () => {
  // Add 1 or 2 positive and 1 or 2 negative tests
  it("renders from errors for step 1", () => {
    const initialState: TFormSlice = {
      values: { name: "", email: "", phone: "", age: 0, job: "", school: "" },
      isLoading: false,
      errors: {},
    };

    const { getByText, getByPlaceholderText, getByRole } = renderWithProviders(
      <Task3 />,
      {
        preloadedState: {
          form: initialState,
        },
      }
    );
    // check for initial errors
    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const ageInput = getByPlaceholderText("Age");

    const nameError = getByText("Name is required");
    let emailError = getByText("Email is required");
    const ageError = getByText("Age must be between 0 and 100");

    const nextBtn = getByRole("button");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(ageError).toBeInTheDocument();

// add name to input
    expect(nextBtn).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput).toHaveValue("test");
    expect(nameError).not.toBeInTheDocument();
    
    // add age to input

    fireEvent.change(ageInput, { target: { value: 25 } });
    expect(ageInput).toHaveValue(25);
    expect(ageError).not.toBeInTheDocument();

// add invalid email to input and check for email error
    fireEvent.change(emailInput, { target: { value: "test" } });
    expect(emailInput).toHaveValue("test");
    emailError = getByText("Email is invalid");
    expect(emailError).toBeInTheDocument();

// add valid email
    fireEvent.change(emailInput, { target: { value: "test@a.com" } });
    expect(emailInput).toHaveValue("test@a.com");
    expect(emailError).not.toBeInTheDocument();
    expect(nextBtn).not.toBeDisabled();
  });
});
