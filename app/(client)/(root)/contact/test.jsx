/** @format */
"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    console.log("in");
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>Test</div>
      <div>Count: {count}</div>
      <button onClick={(c) => setCount((c) => c + 1)}>Increase +</button>
    </>
  );
};

export default Test;
