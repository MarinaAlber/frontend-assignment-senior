import { ChangeEvent, FC, useEffect, useState } from "react";

import { User } from "./types";
import { MESSAGES } from "./constants";
import { useFetch } from "./hooks/useFetch";
import { getUsersListUrl } from "./services/userAPI";

import "./index.scss";

const Task1: FC = () => {
  // decided to use github 'users & search' apis to fetch get data,
  // not the locally mocked data because it was mentioned in this file.
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const url = getUsersListUrl(searchQuery, pageNumber);

  const { isLoading, error, data, callRequest, nextLink, prevLink } =
    useFetch<User>(url);

  useEffect(() => {
    let delayDebounceFn = null;
    if (searchQuery) {
      delayDebounceFn = setTimeout(() => {
        setPageNumber(1);
        callRequest(getUsersListUrl(searchQuery, 1));
      }, 1000);
    } else {
      setPageNumber(0);
      callRequest(getUsersListUrl());
    }

    return () => {
      if (delayDebounceFn) {
        clearTimeout(delayDebounceFn);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const renderLoading = () => {
    if (isLoading) {
      return <div className="dashboard__alt-state">{MESSAGES.loading}</div>;
    }
  };

  const renderError = () => {
    if (error && !isLoading) {
      return <div className="dashboard__alt-state">{error}</div>;
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderInputSearch = () => {
    const isDisabled = isLoading || !!error;
    return (
      <input
        role="search"
        aria-label="Search"
        aria-placeholder="Search"
        aria-disabled={isDisabled}
        disabled={isDisabled}
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
    );
  };

  const renderUsers = () => {
    if (data && !data.length && !isLoading && !error) {
      return (
        <div className="dashboard__alt-state">{MESSAGES.noUsersFound}</div>
      );
    }
    const users = data?.map((user) => <li key={user.id}>{user.login}</li>);

    return <>{users}</>;
  };

  const renderPagination = () => {
    if (error || isLoading) return null;
    if (nextLink || prevLink) {
      return (
        <div className="dashboard__pagination">
          {nextLink && (
            <button
              aria-label="Next"
              role="button"
              onClick={() => callRequest(nextLink)}
            >
              Next
            </button>
          )}
          {prevLink && (
            <button
              aria-label="Prev"
              role="button"
              onClick={() => callRequest(prevLink)}
            >
              Prev
            </button>
          )}
        </div>
      );
    }
  };
  return (
    <div className="dashboard">
      {renderInputSearch()}
      {renderLoading()}
      {renderError()}
      <ul data-testid="users-list">{renderUsers()}</ul>
      {renderPagination()}
    </div>
  );
};

export default Task1;
