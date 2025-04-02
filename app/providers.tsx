import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalContextProvider } from "./hooks/useGlobalContext";
import { NavProvider } from "./contexts/MenuToggleContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // Keep data fresh for 1 hour
        refetchOnWindowFocus: false, // Prevent refetching when the window is focused
        refetchOnReconnect: false, // Prevent refetching when the connection is restored
        refetchOnMount: false, // Prevent refetching when a component mounts } },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <NavProvider>{children}</NavProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </GlobalContextProvider>
    </QueryClientProvider>
  );
};
export default Providers;
