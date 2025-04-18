/** @format */
"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  function finFactrial(num) {
    if (num === 0) return 1;

    console.log("before num", num);
    let factorial = num * finFactrial(num - 1);
    // console.log("after", num);
    return factorial;
  }
  finFactrial(5);

  return (
    <>
      <div>Test</div>
    </>
  );
};

export default Test;
