import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME } from "./theme";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof THEME.light;
  toggleTheme: () => void;
}

const STORAGE_KEY = "appTheme";

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: THEME.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [useSystem, setUseSystem] = useState(true); // track if user wants manual override or not

  // Load saved theme (or system default)
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          setTheme(savedTheme);
          setUseSystem(false); // user has chosen manually
        } else {
          const systemTheme = Appearance.getColorScheme();
          setTheme(systemTheme === "dark" ? "dark" : "light");
          setUseSystem(true);
        }
      } catch (error) {
        console.log("Failed to load theme:", error);
      }
    };
    loadTheme();
  }, []);

  // Watch for system theme changes if using system preference
  useEffect(() => {
    if (!useSystem) return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? "dark" : "light");
    });

    return () => subscription.remove();
  }, [useSystem]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setUseSystem(false); // once user toggles, we stop auto-sync
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.log("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: theme === "light" ? THEME.light : THEME.dark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
