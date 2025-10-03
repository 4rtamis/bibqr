import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getInitialTheme,
  applyTheme,
  saveTheme,
  resolveTheme,
  type ThemeMode,
} from "@/lib/theme";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  // Apply on mount and when system changes (if in system mode)
  useEffect(() => {
    const m = getInitialTheme();
    setMode(m);
    applyTheme(m);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (m === "system") applyTheme("system");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  function cycle() {
    const order: ThemeMode[] = ["dark", "light", "system"]; // start from dark since your default is dark
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
    applyTheme(next);
    saveTheme(next);
  }

  const label = (() => {
    const t = resolveTheme(mode);
    if (mode === "system") return `System (${t})`;
    return t === "dark" ? "Dark" : "Light";
  })();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={cycle}
      aria-label="Toggle color theme"
    >
      {label}
    </Button>
  );
}
