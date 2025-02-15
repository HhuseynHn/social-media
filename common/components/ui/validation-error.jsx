/** @format */

import React from "react";

export const ValidationError = ({ className, children }) => {
  return (
    <>
      <p className={`text-[red] text-sm ${className}`}>{children}</p>
    </>
  );
};
