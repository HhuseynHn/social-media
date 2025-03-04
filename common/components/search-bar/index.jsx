/** @format */

import React from "react";
import { Button, Input } from "..";
import { IoIosSearch } from "react-icons/io";
const SearchBar = () => {
  return (
    <>
      <div className="w-72 relative">
        <Input
          className="rounded-2xl h-8 placeholder:text-[12px]"
          placeholder="Search"
        />

        <Button className="bg-transparent absolute top-[2px] shadow-none hover:bg-inherit dark:text-black active:scale-150  pr-[12px] border-0 outline-0 text-current right-0 rounded-2xl py-0 h-[28px]">
          <IoIosSearch />
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
