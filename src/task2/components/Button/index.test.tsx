import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Button, { TButton } from ".";
import { lightTheme } from "../../theme";

const renderButton = (props: TButton) => {
  return render(<Button {...props}>{props.children}</Button>);
};

describe("Button Component", () => {
  // Add 1 or 2 positive and 1 or 2 negative tests
  it("show button with the primary colors", () => {
    const { getByRole, getByText } = renderButton({
      children: "primary button",
      onClick: () => {},
    });

    const btn = getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(getByText("primary button")).toBeInTheDocument();

    // the toHaveStyle function applies the hover effect,
    // that is why we're testing the background color with the onHover shade
    // ref : https://github.com/testing-library/jest-dom/issues/594
    expect(btn).toHaveStyle({
      background: lightTheme.colors.primary[6],
      color: lightTheme.colors.primary[0],
    });
  });

  it("show button with the secondary colors", () => {
    const { getByRole, getByText } = renderButton({
      children: "secondary button",
      onClick: () => {},
      color: "secondary",
    });
    const btn = getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(getByText("secondary button")).toBeInTheDocument();

    // the toHaveStyle function applies the hover effect,
    // that is why we're testing the background color with the onHover shade
    // ref : https://github.com/testing-library/jest-dom/issues/594
    expect(btn).toHaveStyle({
      background: lightTheme.colors.secondary[6],
      color: lightTheme.colors.secondary[0],
    });
  });

  it("showing primary button should not have secondary colors", () => {
    const { getByRole } = renderButton({
      children: "primary button",
      onClick: () => {},
    });
    const btn = getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveStyle({
      background: lightTheme.colors.secondary[6],
      color: lightTheme.colors.secondary[0],
    });
  });
});
