// Password generation hook

import { useState, useCallback, useEffect } from "react";
import { generatePassword, calculateStrength, type PasswordOptions } from "../utils/password";

export function usePassword(initialOptions?: PasswordOptions) {
  const [options, setOptions] = useState<PasswordOptions>(
    initialOptions || {
      length: 16,
      lower: true,
      upper: true,
      number: true,
      symbol: true,
    }
  );
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<number>(0);

  const generate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  }, [options]);

  // Generate password when options change
  useEffect(() => {
    generate();
  }, [generate]);

  const updateOption = useCallback((key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyPreset = useCallback((preset: "strong" | "medium" | "simple") => {
    switch (preset) {
      case "strong":
        setOptions({ length: 20, lower: true, upper: true, number: true, symbol: true });
        break;
      case "medium":
        setOptions({ length: 16, lower: true, upper: true, number: true, symbol: false });
        break;
      case "simple":
        setOptions({ length: 12, lower: true, upper: true, number: false, symbol: false });
        break;
    }
  }, []);

  return {
    options,
    password,
    strength,
    generate,
    updateOption,
    applyPreset,
  };
}
