import { describe, it  } from "vitest";

// Mock the useFetch hook


describe("Task1 Component", () => {
  it("renders users and filters them by search term", async () => {

  });

  it("shows no users found message when filter returns no results", async () => {

  });
});

// import { resetState } from './yourModule';

// describe('resetState', () => {
//   it('should set isLoading to true', () => {
//     const { result } = renderHook(() => resetState());
//     expect(result.current.isLoading).toBe(true);
//   });

//   it('should set data to null', () => {
//     const { result } = renderHook(() => resetState());
//     expect(result.current.data).toBeNull();
//   });

//   it('should set hasError to false', () => {
//     const { result } = renderHook(() => resetState());
//     expect(result.current.hasError).toBe(false);
//   });
// });