import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import { Theme, ThemeContext } from "./context";
import { FC, useState } from "react";

const Task2: FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [value, setValue] = useState<string>("");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        Task 2
        <button
          aria-label="Toggle Theme"
          role="button"
          onClick={() =>
            setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
          }
        >
          Toggle Theme
        </button>
        <div>
          <h4>Buttons</h4>
          <Button
            onClick={() => {
              console.log("test button clicked");
            }}
            margin="xs"
          >
            Primary Test Button
          </Button>
          <Button
            onClick={() => {
              console.log("test button clicked");
            }}
            color="secondary"
            margin="xs"
          >
            secondary Test Button
          </Button>
        </div>
        <div>
          <h4>Card</h4>

          <Card padding="md" margin="sm">
            <h6>this is a card</h6>
            this is the card content
          </Card>
        </div>
        <div>
          <h4>Input</h4>
          <Input
            onChange={(value) => setValue(value as string)}
            value={value}
            padding="sm"
            margin="sm"
          />
          value :{value}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Task2;
