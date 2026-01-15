// Password generator component

import { useEffect } from "react";
import { useClipboard } from "../hooks/useClipboard";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePassword } from "../hooks/usePassword";
import type { PasswordOptions } from "../utils/password";
import { StrengthBar } from "./StrengthBar";

const defaultOptions: PasswordOptions = {
  length: 16,
  lower: true,
  upper: true,
  number: true,
  symbol: true,
};

export function PasswordGenerator() {
  const [savedOptions, setSavedOptions] = useLocalStorage<PasswordOptions>(
    "password-generator-options",
    defaultOptions
  );
  const { options, password, strength, generate, updateOption, applyPreset } =
    usePassword(savedOptions);
  const { copied, copyToClipboard } = useClipboard();
  const { t } = useLanguage();

  // Save options when they change
  useEffect(() => {
    setSavedOptions(options);
  }, [options, setSavedOptions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t.passwordGenerator}
      </h2>

      {/* Preset buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => applyPreset("strong")}
          className="px-3 py-1 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer font-medium"
        >
          {t.strong}
        </button>
        <button
          onClick={() => applyPreset("medium")}
          className="px-3 py-1 text-sm bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-500 transition cursor-pointer font-medium"
        >
          {t.medium}
        </button>
        <button
          onClick={() => applyPreset("simple")}
          className="px-3 py-1 text-sm bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition cursor-pointer font-medium"
        >
          {t.simple}
        </button>
      </div>

      {/* Length slider */}
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
          {t.length}: {options.length}
        </label>
        <input
          type="range"
          min="4"
          max="64"
          value={options.length}
          onChange={(e) => updateOption("length", parseInt(e.target.value))}
          className="w-full cursor-pointer accent-blue-500 dark:accent-blue-600"
        />
      </div>

      {/* Character options */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.lower}
            onChange={(e) => updateOption("lower", e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-500 dark:accent-blue-600"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {t.lowercase}
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.upper}
            onChange={(e) => updateOption("upper", e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-500 dark:accent-blue-600"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {t.uppercase}
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.number}
            onChange={(e) => updateOption("number", e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-500 dark:accent-blue-600"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {t.numbers}
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.symbol}
            onChange={(e) => updateOption("symbol", e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-500 dark:accent-blue-600"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {t.special}
          </span>
        </label>
      </div>

      {/* Generated password */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-mono"
          />
          <button
            onClick={() => copyToClipboard(password)}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer font-medium"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <StrengthBar strength={strength} />
      </div>

      {/* Warning about weak passwords */}
      {strength <= 3 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                {t.dontUsePasswords}
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                {t.weakPasswordsWarning}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "abcd1234",
                  "qwerty",
                  "password",
                  "12345678",
                  "blabla",
                  "admin123",
                  "iloveyou",
                ].map((badPass) => (
                  <span
                    key={badPass}
                    className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded text-xs font-mono"
                  >
                    {badPass}
                  </span>
                ))}
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 italic">
                {t.useGeneratorTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fun fact about common weak passwords */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <span className="font-semibold">{t.funFact}</span> {t.funFactText}
        </p>
      </div>

      {/* Regenerate button */}
      <button
        onClick={generate}
        className="w-full px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-100 rounded hover:bg-gray-800 dark:hover:bg-gray-500 transition cursor-pointer font-medium"
      >
        {t.regenerate}
      </button>
    </div>
  );
}
