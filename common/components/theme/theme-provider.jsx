/** @format */

"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div />;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
