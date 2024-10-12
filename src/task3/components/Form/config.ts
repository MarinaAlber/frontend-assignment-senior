import { TFormValues, TErrors } from "src/task3/types";

export const getStep1Validation = (values: TFormValues) => {
  const errors: TErrors = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  errors.name = !values.name ? "Name is required" : "";
  errors.email = !values.email
    ? "Email is required"
    : values.email.match(emailRegex)
    ? ""
    : "Email is invalid";
  errors.age =
    values.age === null
      ? "Age is required"
      : values.age <= 0 || values.age > 100
      ? "Age must be between 0 and 100"
      : "";

  return errors;
};

export const getStep2Validation = (values: TFormValues) => {
  const errors: TErrors = {};

  errors.age = !values.age ? "Age is required" : "";
  errors.job = !values.job && values.age > 17 ? "Job is required" : "";
  errors.school =
    !values.school && values.age <= 17 ? "School is required" : "";
  return errors;
};

export const cleanUpErrors = (errors: TErrors) => {
  const newErrors: TErrors = { ...errors };
  for (const k in newErrors) {
    if (Object.prototype.hasOwnProperty.call(newErrors, k)) {
      const key = k as keyof TErrors;
      const element = newErrors[key];
      if (!element) {
        delete newErrors[key];
      }
    }
  }
  return newErrors;
};
