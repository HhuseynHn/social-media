/** @format */

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "..";

const Account = () => {
  return (
    <>
      <div className="cursor-pointer hover:text-slate-400">
        <Avatar>
          <AvatarImage src=""></AvatarImage>
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default Account;
