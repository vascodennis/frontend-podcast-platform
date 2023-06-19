"use client";

import { createContext, useState, useMemo } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const providerValue = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading]
  );

  return (
    <LoadingContext.Provider value={providerValue}>
      {children}
    </LoadingContext.Provider>
  );
}
