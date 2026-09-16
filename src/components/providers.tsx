"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

/**
 * reducedMotion="user" - анимации на motion уважают системную настройку
 * «уменьшить движение»; одного CSS-правила для них не хватает.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
