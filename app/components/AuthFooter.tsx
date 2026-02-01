/**
 * Footer com toggle de tema para páginas de autenticação
 */

"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const AuthFooter = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ThemeToggle />
    </div>
  );
};
