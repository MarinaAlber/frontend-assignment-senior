import { Sizes } from "../types";

type Colors = { primary: string[]; secondary: string[] };
export type ThemeObject = {
  sizes: { [key in Sizes]: string };
  boxShadow: string;
  borderRadius: string;
  body: string;
  colors: Colors;
};

const sizes: { [key in Sizes]: string } = {
  xs: "0.25rem",
  sm: "0.625rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
};
const commonTheme = {
  sizes,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.25rem",
};

// Create a lightTheme object
export const lightTheme: ThemeObject = {
  body: "#f0f4ff",
  colors: {
    primary: [
      "#ffffff",
      "#edf1ff",
      "#c4d0ff",
      "#9cacff",
      "#7385ff",
      "#4758f5",
      "#323ccf",
      "#2025a8",
      "#121282",
      "#0f0c5c",
    ],
    secondary: [
      "#ffffff",
      "#fafafa",
      "#ededed",
      "#e0e0e0",
      "#d4d4d4",
      "#c7c7c7",
      "#a1a1a1",
      "#7a7a7a",
      "#545454",
      "#2e2e2e",
    ],
  },
  ...commonTheme,
};

// Create a darkTheme object
export const darkTheme: ThemeObject = {
  body: "#16172a",
  colors: {
    primary: [
      "#1c1e43",
      "#232858",
      "#2b3379",
      "#3540a6",
      "#3f4ed3",
      "#6a7ae8",
      "#95a4f3",
      "#bfcaf8",
      "#e9edfa",
      "#f0f4ff",
    ],
    secondary: [
      "#373737",
      "#4a4a4a",
      "#656565",
      "#888888",
      "#acacac",
      "#c1c1c1",
      "#d6d6d6",
      "#e6e6e6",
      "#f5f5f5",
      "#ffffff",
    ],
  },
  ...commonTheme,
};
