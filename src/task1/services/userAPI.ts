// TODO: Implement API service calls (mock API) to fetch users and handle different scenarios

import { SIZE, URLS } from "../constants";
import { apiHandler } from "../lib/api";

export const mockUsers = [];

export const fetchMockUsers = async () => {};

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
