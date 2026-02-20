import type { ReactNode } from "react";
import { ReactQueryProvider } from "./reactQuery";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
