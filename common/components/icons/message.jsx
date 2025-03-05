/** @format */

import React from "react";
import { SiMessenger } from "react-icons/si";
import { Button } from "..";
const Message = () => {
  return (
    <>
      <div>
        <SiMessenger className="z-10 hover:text-slate-500 text-[26px] text-slate-400 cursor-pointer" />
      </div>
    </>
  );
};

export default Message;
