/** @format */

import React from "react";

const ValidationError = ({ className, children }) => {
  return (
    <>
      <p className={`text-[red] text-sm ${className}`}>{children}</p>
    </>
  );
};

export default ValidationError;
