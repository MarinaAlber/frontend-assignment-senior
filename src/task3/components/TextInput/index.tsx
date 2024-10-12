import { TErrors, TFormValues } from "src/task3/types";

import classes from "./input.module.scss";
import { FC, HTMLInputTypeAttribute } from "react";

type TTextInput = {
  name: keyof TFormValues;
  placeholder: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: TErrors;
  formData: TFormValues;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};
const TextInput: FC<TTextInput> = ({
  name,
  placeholder,
  handleInputChange,
  errors,
  formData,
  type = "text",
  required = false,
}) => {
  return (
    <div className={classes.group}>
      <label
        htmlFor={name}
        aria-label={placeholder}
        role="label"
        className={`${classes.group__label} ${
          required ? classes.group__required : ""
        }`}
      >
        {name}
      </label>
      <input
        aria-required ={required}
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`${classes.group__input} ${
          errors[name] ? classes.group__input_error : ""
        }`}
      />
      {errors[name] && (
        <span className={classes.group__error}>{errors[name]}</span>
      )}
    </div>
  );
};

export default TextInput;
