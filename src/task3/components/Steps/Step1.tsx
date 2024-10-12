import { FC } from "react";
import TextInput from "../TextInput";

export const Step1: FC = () => {
  return (
    <>
      <TextInput name="name" placeholder="Name" required />
      <TextInput name="email" placeholder="Email" type="email" required />
      <TextInput name="age" placeholder="Age" type="number" required />
    </>
  );
};
