import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TErrors, TFormValues } from "../types";

type TFormSlice = {
  values: TFormValues;
  isLoading: boolean;
  errors: TErrors;
};
const initialState: TFormSlice = {
  values: { name: "", email: "", phone: "", age: 0, job: "", school: "" },
  isLoading: false,
  errors: {},
};

type TChangePayload = {
  name: keyof TFormValues;
  value: string;
};

export const counterSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    inputChange: (state, action: PayloadAction<TChangePayload>) => {
      const name = action.payload.name as keyof TFormValues;
      state.values[name] = action.payload.value as never;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateErrors: (state, action: PayloadAction<TErrors>) => {
      state.errors = action.payload;
    },
  },
});

export const { inputChange, setLoading, updateErrors } = counterSlice.actions;

export default counterSlice.reducer;
