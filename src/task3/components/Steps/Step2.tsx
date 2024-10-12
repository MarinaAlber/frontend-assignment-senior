import { FC } from "react";
import TextInput from "../TextInput";
import { useSelector } from "react-redux";
import { RootState } from "src/task3/store/store";

export const Step2: FC = () => {
  const { age } = useSelector((state: RootState) => state.form.values);
  return (
    <>
      {age > 17 ? (
        <TextInput name="job" placeholder="Job" required />
      ) : (
        <TextInput name="school" placeholder="School" required />
      )}
      <TextInput name="phone" placeholder="Phone" type="phone" />
    </>
  );
};

