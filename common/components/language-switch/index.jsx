/** @format */

/** @format */

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "..";

const LanguageSwitch = () => {
  return (
    <>
      <Select defaultValue="aze">
        <SelectTrigger className="w-12 text-xs px-1 py-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[70px] min-w-6  max-w-xs p-0 text-xs">
          <SelectGroup>
            <SelectItem
              value="aze"
              className="text-xs py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              AZE
            </SelectItem>
            <SelectItem
              value="en"
              className="text-xs py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 ">
              EN
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default LanguageSwitch;
