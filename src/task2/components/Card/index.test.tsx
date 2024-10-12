import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Card, { TCard } from ".";
import { darkTheme, lightTheme } from "../../theme";

const renderButton = (props: TCard) => {
  return render(
    <Card {...props}>
      <h6>this is a card</h6>
      <p>this is a card description</p>
    </Card>
  );
};

describe("Card Component", () => {
  // Add 1 or 2 positive and 1 or 2 negative tests
  it("show card with the light theme", () => {
    const { getByTestId, getByText } = renderButton({
      children: "primary button",
      padding: "sm",
    });

    const card = getByTestId("card");

    expect(card).toBeInTheDocument();
    expect(getByText("this is a card")).toBeInTheDocument();

    expect(card).toHaveStyle({
      padding: lightTheme.sizes["sm"],
      borderRadius: lightTheme.borderRadius,
      color: lightTheme.colors.primary[8],
      background: lightTheme.colors.primary[0],
    });
  });
  it("show card with the light theme, should not have colors from the dark theme", () => {
    const { getByTestId, getByText } = renderButton({});

    const card = getByTestId("card");

    expect(card).toBeInTheDocument();
    expect(getByText("this is a card")).toBeInTheDocument();

    expect(card).not.toHaveStyle({
      color: darkTheme.colors.primary[8],
      background: darkTheme.colors.primary[0],
    });
  });
});
