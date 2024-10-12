import styled from "@emotion/styled";
import { FC, PropsWithChildren, useContext } from "react";
import { Sizes } from "../../types";
import { ThemeContext } from "../../context";
import { darkTheme, lightTheme, ThemeObject } from "../../theme";

// Define the type for the button
export type TCard = {
  padding?: Sizes;
  margin?: Sizes;
} & PropsWithChildren;

type TStyledCardProps = {
  theme: ThemeObject;
  padding: Sizes;
  margin: Sizes;
};

// Define the styled button
const StyledCard = styled.div`
  padding: ${(props: TStyledCardProps) => props.theme.sizes[props.padding]};
  margin: ${(props: TStyledCardProps) => props.theme.sizes[props.margin]};
  background-color: ${(props: TStyledCardProps) =>
    props.theme.colors.primary[0]};
  color: ${(props: TStyledCardProps) => props.theme.colors.primary[8]};
  border: ${(props: TStyledCardProps) =>
    `2px solid ${props.theme.colors.secondary[2]}`};
  border-radius: ${(props: TStyledCardProps) => props.theme.borderRadius} ;
  box-shadow: ${(props: TStyledCardProps) => props.theme.boxShadow};
`;

const Card: FC<TCard> = ({ children, padding = "md", margin = "md" }) => {
  const theme = useContext(ThemeContext);
  const themeObj = theme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledCard
      data-testid="card"
      padding={padding}
      margin={margin}
      theme={themeObj}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
