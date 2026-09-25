//redux провайдер
"use client";

import HouseholdBootstrap from "@/features/households/ui/HouseholdBootstrap";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HouseholdBootstrap />
      {children}
    </Provider>
  );
}
