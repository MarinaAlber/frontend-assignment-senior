import { describe, it, vi, expect } from "vitest";
import * as useFetchHook from "./hooks/useFetch";
import { fetchMockUsers, mockUsers } from "./services/userAPI";
import Task1 from ".";
import { fireEvent, render } from "@testing-library/react";
import { MESSAGES } from "./constants";

import { afterEach } from "node:test";

// Mock the useFetch hook
const useFetchSpy = vi.spyOn(useFetchHook, "useFetch" as never);

useFetchSpy.mockReturnValue({
  isLoading: false,
  error: "",
  data: mockUsers,
  callRequest: () => {},
  nextLink: "",
  prevLink: "",
});

describe("Task1 Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders users list after fetching them", async () => {
    const { getByTestId } = render(<Task1 />);
    useFetchSpy.mockReturnValue({
      isLoading: false,
      error: "",
      data: mockUsers,
      callRequest: () => {},
      nextLink: "",
      prevLink: "",
    });

    expect(getByTestId("users-list").children.length).toBe(2);
  });

  it("renders filters users by search term", async () => {
    const { getByRole, getByTestId } = render(<Task1 />);

    useFetchSpy.mockReturnValue({
      isLoading: false,
      error: "",
      data: () => fetchMockUsers("test2"),
      callRequest: () => {},
      nextLink: "",
      prevLink: "",
    });

    const searchInput = getByRole("search");
    expect(getByRole("search")).toBeInTheDocument();

    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "test2" } });
    expect(searchInput).toHaveValue("test2");
    await new Promise((r) => setTimeout(r, 1000));

    expect(getByTestId("users-list").children.length).toBe(1);
  });

  it("shows no users found message when filter returns no results", async () => {
    const { getByRole, getByText } = render(<Task1 />);

    useFetchSpy.mockReturnValueOnce({
      isLoading: false,
      error: "",
      data: () => fetchMockUsers("test22"),
      callRequest: () => {},
      nextLink: "",
      prevLink: "",
    });

    const searchInput = getByRole("search");
    expect(getByRole("search")).toBeInTheDocument();

    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "test22" } });
    expect(searchInput).toHaveValue("test22");
    await new Promise((r) => setTimeout(r, 1000));
    expect(getByText(MESSAGES.noUsersFound)).toBeInTheDocument();
  });
});
