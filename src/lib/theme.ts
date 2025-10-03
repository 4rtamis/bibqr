export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "bibqr:theme";

export function getSystemPrefersDark(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  return saved ?? "system";
}

export function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "system") return getSystemPrefersDark() ? "dark" : "light";
  return mode;
}

export function applyTheme(mode: ThemeMode) {
  const theme = resolveTheme(mode);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function saveTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode);
}
