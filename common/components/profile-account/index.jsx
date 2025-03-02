/** @format */

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "..";

const Account = () => {
  return (
    <>
      <div>
        <Avatar>
          <AvatarImage src=""></AvatarImage>
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default Account;
