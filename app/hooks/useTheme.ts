// Theme hook for dark/light mode

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Start with "light" to match server render, then hydrate from localStorage
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage after mount (client-side only)
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored === "dark" ? "dark" : "light";
    setTheme(initialTheme);

    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update document class and localStorage
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme((prev: Theme) => {
      const newTheme = prev === "light" ? "dark" : "light";
      // Apply immediately for instant feedback
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return { theme: mounted ? theme : "light", toggleTheme };
}
