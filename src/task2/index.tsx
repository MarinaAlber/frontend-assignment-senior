import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import { Theme, ThemeContext } from "./context";
import { FC, useState } from "react";

import "./styles.scss";
const Task2: FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [value, setValue] = useState<string>("");
  return (
    <ThemeContext.Provider value={theme}>
      <div className="task2">
        <div className="task2__header">
          <h5> Current Theme: {theme}</h5>
          <button
            aria-label="Toggle Theme"
            role="button"
            onClick={() =>
              setTheme((prevTheme) =>
                prevTheme === "light" ? "dark" : "light"
              )
            }
          >
            Toggle Theme
          </button>
        </div>
        <div className="task2__component">
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
            Secondary Test Button
          </Button>
        </div>
        <div className="task2__component">
          <h4>Card</h4>

          <Card padding="md" margin="sm">
            <h6>this is a card</h6>
            this is the card content
          </Card>
        </div>
        <div className="task2__component">
          <h4>Input</h4>
          <Input
            onChange={(value) => setValue(value as string)}
            value={value}
            padding="sm"
            margin="xs"
          />
          <span>value: {value}</span>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Task2;
