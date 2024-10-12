import styled from "@emotion/styled";
import { FC, HTMLInputTypeAttribute, useContext } from "react";
import { Sizes } from "../../types";
import { ThemeContext } from "../../context";
import { darkTheme, lightTheme, ThemeObject } from "../../theme";

// Define the type for the button
export type TInput = {
  value: string;
  onChange: (value: string | number) => void;
  type?: HTMLInputTypeAttribute;
  padding?: Sizes;
  margin?: Sizes;
  placeholder?: string;
};

type TInputProps = {
  theme: ThemeObject;
  padding: Sizes;
  margin: Sizes;
};

// Define the styled button
const StyledCard = styled.input`
  padding: ${(props: TInputProps) => props.theme.sizes[props.padding]};
  margin: ${(props: TInputProps) => props.theme.sizes[props.margin]};
  background-color: ${(props: TInputProps) => props.theme.colors.primary[0]};
  color: ${(props: TInputProps) => props.theme.colors.primary[9]};
  border: ${(props: TInputProps) =>
    `1px solid ${props.theme.colors.secondary[2]}`};
  border-radius: ${(props: TInputProps) => props.theme.borderRadius};
  &:focus {
    outline: ${(props: TInputProps) =>
      `2px solid ${props.theme.colors.primary[9]}`};
  }
`;

const Card: FC<TInput> = ({
  padding = "sm",
  margin = "xs",
  value = "",
  onChange = () => {},
  placeholder = "",
  type = "text",
}) => {
  const theme = useContext(ThemeContext);
  const themeObj = theme === "dark" ? darkTheme : lightTheme;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledCard
      role="textbox"
      padding={padding}
      margin={margin}
      theme={themeObj}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      type={type}
    ></StyledCard>
  );
};

export default Card;
