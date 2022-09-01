import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

export interface ThemeContextProps {
  theme: theme;
  setTheme: (theme: theme) => void;
}

type theme = "dark" | "light";

export function getInitialTheme(): theme {
  if (typeof window !== "undefined") {
    const storedPref = window.localStorage.getItem("color-theme");
    if (storedPref !== null) {
      return storedPref as theme;
    }

    const systemPref = window.matchMedia("(prefers-color-scheme: dark)");
    if (systemPref.matches) {
      return "dark";
    }
  }
  return "light";
}

const ThemeContext = createContext<ThemeContextProps>(undefined as any);

export function ThemeProvider(
  props: PropsWithChildren<{ theme: theme }>
): JSX.Element {
  const [theme, setTheme] = useState<theme>(props.theme);

  function rawSetTheme(rawTheme: theme): void {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      const isDark = rawTheme === "dark";

      root.classList.remove(isDark ? "light" : "dark");
      root.classList.add(rawTheme);

      localStorage.setItem("color-theme", rawTheme);
    }
  }

  useEffect(() => {
    setTheme(getInitialTheme);
  }, []);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}
