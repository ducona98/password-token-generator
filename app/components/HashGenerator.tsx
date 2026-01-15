// Hash generator component

import { useState } from "react";
import { useClipboard } from "../hooks/useClipboard";
import { useLanguage } from "../hooks/useLanguage";
import { sha256 } from "../utils/hash";

export function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { copied, copyToClipboard } = useClipboard();
  const { t } = useLanguage();

  const handleInputChange = async (value: string) => {
    setInput(value);
    if (value.trim()) {
      setIsGenerating(true);
      try {
        const result = await sha256(value);
        setHash(result);
      } catch (error) {
        console.error("Hash generation failed:", error);
        setHash("");
      } finally {
        setIsGenerating(false);
      }
    } else {
      setHash("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.hashGenerator}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{t.hashDescription}</p>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
          {t.inputText}
        </label>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={t.enterTextToHash}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-mono resize-none"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
          {t.sha256Hash}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={isGenerating ? t.generating : hash}
            readOnly
            placeholder={t.hashWillAppear}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-mono text-sm"
          />
          <button
            onClick={() => copyToClipboard(hash)}
            disabled={!hash || isGenerating}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>
    </div>
  );
}
