import styled from "@emotion/styled";
import { FC, PropsWithChildren, useContext } from "react";
import { Sizes } from "../../types";
import { ThemeContext } from "../../context";
import { darkTheme, lightTheme, ThemeObject } from "../../theme";

// Define the type for the button
export type TButton = {
  onClick: () => void;
  color?:'primary' | 'secondary'
  padding?: Sizes;
  margin?: Sizes;
} & PropsWithChildren;

type TStyledButtonProps = {
  theme: ThemeObject;
  color:'primary' | 'secondary'
  padding: Sizes;
  margin: Sizes;
};

// Define the styled button
const StyledButton = styled.button`
  padding: ${(props: TStyledButtonProps) => props.theme.sizes[props.padding]};
  margin: ${(props: TStyledButtonProps) => props.theme.sizes[props.margin]};
  background-color: ${(props: TStyledButtonProps) =>
    props.theme.colors[props.color][5]};
  color: ${(props: TStyledButtonProps) => props.theme.colors[props.color][0]};
  border: none;
  border-radius: ${(props: TStyledButtonProps) =>
    props.theme.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${(props: TStyledButtonProps) =>
      props.theme.colors[props.color][6]};
  }
  &:focus {
    outline: ${(props: TStyledButtonProps) =>
      `1px solid ${props.theme.colors[props.color][7]}`};
    background-color: ${(props: TStyledButtonProps) =>
      props.theme.colors[props.color][7]};
  }
`;

const Button: FC<TButton> = ({
  children,
  onClick,
  color= "primary",
  padding = "md",
  margin = "md",
}) => {
  const theme = useContext(ThemeContext);
  const themeObj = theme === "dark" ? darkTheme : lightTheme;
  return (
    <StyledButton
      role="button"
      onClick={onClick}
      padding={padding}
      margin={margin}
      theme={themeObj}
      color={color}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
