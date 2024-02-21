"use client";

import { readFile } from "../../theme";

const theme = async (name: string) => {
  const theme = await readFile();

  return theme(name);
};

export const read = async (name: string) => {
  const data = await theme(name);

  return data;
};
