export type TRole = "student" | "employee" | "";

export type TFormValues = {
  name: string;
  email: string;
  phone: string;
  age: number;
  job?: string;
  school?: string;
};

export type TErrors = {
  [key in keyof TFormValues]?: string;
};
