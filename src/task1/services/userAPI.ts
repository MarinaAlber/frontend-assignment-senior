// TODO: Implement API service calls (mock API) to fetch users and handle different scenarios
import { SIZE, URLS } from "../constants";
import { apiHandler } from "../lib/api";
import { User } from "../types";

export const mockUsers: User[] = [
  { id: 1, login: "test", avatar_url: "test", html_url: "test" },
  { id: 2, login: "test2", avatar_url: "test2", html_url: "test2" },
];

export const fetchMockUsers =  (query: string = "") => {
  return mockUsers.filter((user) => user.login.includes(query));
};

export const getUsersListUrl = (
  query: string = "",
  paginationNum: number = 0
): string => {
  const commonParams = {
    per_page: SIZE,
  };

  let url = URLS.getUsers;
  let params: object = {
    ...commonParams,
    since: paginationNum || 0,
  };

  if (query) {
    url = URLS.searchUsers;
    params = {
      ...commonParams,
      q: query,
      per_page: SIZE,
      page: paginationNum || 1,
    };
  }

  return apiHandler.getUri({
    url,
    params,
  });
};
