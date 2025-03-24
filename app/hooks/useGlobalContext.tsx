import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context state
interface GlobalContextType {
  symbol: string;
  setSymbol: (symbol: string) => void;
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Initial state default values
export const DEFAULT_SYMBOL = "AAPL";

// Props for the context provider component
interface GlobalContextProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps your app and makes global state available to the tree
 */
export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  // Main state for the symbol to track
  const [symbol, setSymbol] = useState<string>(DEFAULT_SYMBOL);

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      symbol,
      setSymbol,
    }),
    [symbol]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

/**
 * Custom hook to use the global context state
 */
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
}
