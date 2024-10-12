import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import { TErrors, TFormValues } from "./types";

import classes from "./form.module.scss";
import TextInput from "./components/TextInput";

const Task3: FC = () => {
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Create formData state with name, email etc.
  const [formData, setFormData] = useState<TFormValues>({
    name: "",
    email: "",
    phone: "",
    age: 0,
    job: "",
    school: "",
  });

  // handle errors state
  const [errors, setErrors] = useState<TErrors>({});

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const newErrors: TErrors = {};
    if (active === 1) {
      newErrors.name = !formData.name ? "Name is required" : "";
      newErrors.email = !formData.email
        ? "Email is required"
        : formData.email.match(emailRegex)
        ? ""
        : "Email is invalid";
      newErrors.age =
        formData.age === null
          ? "Age is required"
          : formData.age <= 0 || formData.age > 100
          ? "Age must be between 0 and 100"
          : "";
    }

    if (active === 2) {
      newErrors.age = !formData.age ? "Age is required" : "";
      newErrors.job =
        !formData.job && formData.age > 17 ? "Job is required" : "";
      newErrors.school =
        !formData.school && formData.age <= 17 ? "School is required" : "";
    }

    for (const k in newErrors) {
      if (Object.prototype.hasOwnProperty.call(newErrors, k)) {
        const key = k as keyof TErrors;
        const element = newErrors[key];
        if (!element) {
          delete newErrors[key];
        }
      }
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [formData, active]);

  // Create a validate function to check if name, email etc. are not empty
  const renderStep1 = () => {
    const commonProps = {
      handleInputChange,
      errors,
      formData,
    };
    return (
      <>
        <TextInput name="name" placeholder="Name" required {...commonProps} />
        <TextInput
          name="email"
          placeholder="Email"
          type="email"
          required
          {...commonProps}
        />
        <TextInput
          name="age"
          placeholder="Age"
          type="number"
          required
          {...commonProps}
        />
      </>
    );
  };

  const renderStep2 = () => {
    const commonProps = {
      handleInputChange,
      errors,
      formData,
    };

    return (
      <>
        {formData.age > 17 ? (
          <TextInput name="job" placeholder="Job" required {...commonProps} />
        ) : (
          <TextInput
            name="school"
            placeholder="School"
            required
            {...commonProps}
          />
        )}
        <TextInput
          name="phone"
          placeholder="Phone"
          type="phone"
          {...commonProps}
        />
      </>
    );
  };

  const renderStep3 = () => {
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
  const renderForm = () => {
    if (active === 1) {
      return renderStep1();
    }
    if (active === 2) {
      return renderStep2();
    }
    if (active === 3) {
      return renderStep3();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleStepChange = (step: number) => {
    if (Object.keys(errors).length === 0 || step < active) {
      setActive(step);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setActive(3);
      }, 2000);
    }
  };
  const renderActions = () => {
    const isDisabled = Object.keys(errors).length > 0 || isLoading;

    return (
      <div className={classes.actions}>
        {active > 1 && (
          <button
            type="button"
            className={classes.button__secondary}
            onClick={() => handleStepChange(active - 1)}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          >
            Back
          </button>
        )}

        {active < 2 && (
          <button
            type="button"
            className={classes.button__primary}
            onClick={() => handleStepChange(active + 1)}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          >
            Next
          </button>
        )}

        {active === 2 && (
          <button
            type="submit"
            className={classes.button__primary}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        )}
      </div>
    );
  };

  return (
    <section className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h4>Step {active}</h4>
        <div className={classes.step}>{renderForm()}</div>

        {renderActions()}
      </form>
    </section>
  );
};

export default Task3;
