import { TFormValues } from "src/task3/types";

import classes from "./input.module.scss";
import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputChange } from "../../store/slice";
import { RootState } from "../../store/store";

type TTextInput = {
  name: keyof TFormValues;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};

const TextInput: FC<TTextInput> = ({
  name,
  placeholder,
  type = "text",
  required = false,
}) => {
  const dispatch = useDispatch();

  const { values: formData, errors } = useSelector(
    (state: RootState) => state.form
  );
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(inputChange({ name: name as keyof TFormValues, value }));
  };

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
        aria-required={required}
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
