import React from "react";
import { IoSearchSharp } from "react-icons/io5";

export function SearchInput({
  searchText,
  onSearchText,
}: {
  searchText: string;
  onSearchText: (searchText: string) => void;
}): JSX.Element {
  return (
    <div className="flex flex-row rounded-md border md:w-2/4 xl:w-2/12 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <IoSearchSharp
        size={22}
        className="ml-4 dark:text-gray-100 text-gray-600 self-center"
      />
      <input
        className="inline-block h-10 flex-1 px-2 outline-0 dark:text-white dark:bg-gray-800"
        placeholder="Search"
        data-testid="ConsortiumSearchBar.Input"
        type="text"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onSearchText(e.target.value);
        }}
      />
    </div>
  );
}
