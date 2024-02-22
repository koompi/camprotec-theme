"use client";

import { createContext, useContext, FC, useEffect, useState } from "react";

import { read } from "../../handler";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextTheme {
  addName: Function;
}

export const ThemeContext = createContext({});

const ThemeProvider: FC<ContextProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);
  const [variable, setvariable] = useState<string>("");

  useEffect(() => {
    const getData = async (variable: string) => {
      try {
        const data = await read(variable);
        setValue(data);
      } catch (error) {
        console.error("Error setting JSON data:", error);
      }
    };
    getData(variable);
  }, [variable]);

  const addName = (name: string) => {
    setvariable(name);
    return value;
  };

  const context = {
    addName: addName,
  };

  return (
    <ThemeContext.Provider value={context}>
      <div className="relative">{props.children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext) as ContextTheme;
}
