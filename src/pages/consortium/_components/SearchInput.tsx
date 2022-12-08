import classNames from "classnames";
import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export function SearchInput({
  searchText,
  onSearchText,
}: {
  searchText: string;
  onSearchText: (searchText: string) => void;
}): JSX.Element {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={classNames(
        "flex flex-row rounded-md border md:w-2/4 xl:w-2/12 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
        {
          "border-primary-500": isFocus,
        }
      )}
    >
      <IoSearchSharp
        size={22}
        className="ml-4 dark:text-gray-100 text-gray-600 self-center"
      />
      <input
        className="h-10 flex-1 px-2 outline-0 rounded-md dark:text-white dark:bg-gray-800"
        placeholder="Search"
        data-testid="ConsortiumSearchBar.Input"
        type="text"
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onSearchText(e.target.value);
        }}
      />
    </div>
  );
}
