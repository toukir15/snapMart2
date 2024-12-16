"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "@/src/context/product.provider";
import { Toaster } from "sonner";
// import UserProvider from "@/src/context/user.provider";
// import { ProductProvider } from "@/src/context/product.provider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <NextUIProvider navigate={router.push}>
          <Toaster />
          <NextThemesProvider>{children}</NextThemesProvider>
        </NextUIProvider>
      </ProductProvider>
    </QueryClientProvider>
  );
}
