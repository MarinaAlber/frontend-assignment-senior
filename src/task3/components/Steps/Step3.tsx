import { FC } from "react";
import { useSelector } from "react-redux";

import { TFormValues } from "src/task3/types";
import { RootState } from "src/task3/store/store";

import classes from "./summary.module.scss";

export const Step3: FC = () => {
  const formData = useSelector((state: RootState) => state.form.values);
  const elements = [];
  for (const k in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, k)) {
      const key = k as keyof TFormValues;
      const element = formData[key];
      if (element) {
        elements.push(
          <div className={classes.summary__item} key={key}>
            <span className={classes.summary__label}>{key}:</span> {element}
          </div>
        );
      }
    }
  }

  return (
    <div className={classes.summary}>
      <h3>Summary</h3>
      {elements}
    </div>
  );
};

