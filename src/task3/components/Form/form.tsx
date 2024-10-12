import { FC, FormEvent, useEffect, useState } from "react";

import { TErrors } from "../../types";

import classes from "./form.module.scss";

import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, updateErrors } from "../../store/slice";
import { Step1, Step2, Step3 } from "../Steps";
import {
  cleanUpErrors,
  getStep1Validation,
  getStep2Validation,
} from "./config";

const UserForm: FC = () => {
  const [active, setActive] = useState(1);

  const {
    values: formData,
    isLoading,
    errors,
  } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const validate = () => {
    let newErrors: TErrors = {};
    if (active === 1) {
      newErrors = getStep1Validation(formData);
    }

    if (active === 2) {
      newErrors = getStep2Validation(formData);
    }

    const cleanedUpErrors = cleanUpErrors(newErrors);
    dispatch(updateErrors(cleanedUpErrors));
  };

  useEffect(() => {
    validate();
  }, [formData, active]);

  const renderForm = () => {
    switch (active) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  const handleStepChange = (step: number) => {
    if (Object.keys(errors).length === 0 || step < active) {
      setActive(step);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(setLoading(false));
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
      <form className={classes.form} onSubmit={handleSubmit} role="form">
        <h4>Step {active}</h4>
        <div className={classes.step}>{renderForm()}</div>

        {renderActions()}
      </form>
    </section>
  );
};

export default UserForm;
