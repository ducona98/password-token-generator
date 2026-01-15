// Token generator component

import { useState } from "react";
import { useClipboard } from "../hooks/useClipboard";
import { useLanguage } from "../hooks/useLanguage";
import { generateUUID, generateRandomToken } from "../utils/token";

export function TokenGenerator() {
  const [uuid, setUuid] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [tokenLength, setTokenLength] = useState<number>(32);
  const [tokenEncoding, setTokenEncoding] = useState<"hex" | "base64">("hex");
  const { copied: uuidCopied, copyToClipboard: copyUuid } = useClipboard();
  const { copied: tokenCopied, copyToClipboard: copyToken } = useClipboard();
  const { t } = useLanguage();

  const handleGenerateUUID = () => {
    setUuid(generateUUID());
  };

  const handleGenerateToken = () => {
    setToken(generateRandomToken(tokenLength, tokenEncoding));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.tokenGenerator}</h2>

      {/* UUID Generator */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.uuidv4}</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={uuid}
            readOnly
            placeholder={t.clickGenerate}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-mono text-sm"
          />
          <button
            onClick={handleGenerateUUID}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer font-medium"
          >
            {t.generate}
          </button>
          <button
            onClick={() => copyUuid(uuid)}
            disabled={!uuid}
            className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white dark:text-gray-100 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uuidCopied ? t.copied : t.copy}
          </button>
        </div>
      </div>

      {/* Random Token Generator */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.randomToken}</h3>
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-800 dark:text-gray-200">{t.length}:</label>
          <input
            type="number"
            min="8"
            max="256"
            value={tokenLength}
            onChange={(e) => setTokenLength(parseInt(e.target.value) || 32)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
          />
          <select
            value={tokenEncoding}
            onChange={(e) => setTokenEncoding(e.target.value as "hex" | "base64")}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 cursor-pointer"
          >
            <option value="hex">{t.hex}</option>
            <option value="base64">{t.base64}</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={token}
            readOnly
            placeholder={t.clickGenerateToken}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-mono text-sm"
          />
          <button
            onClick={handleGenerateToken}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition cursor-pointer font-medium"
          >
            {t.generate}
          </button>
          <button
            onClick={() => copyToken(token)}
            disabled={!token}
            className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white dark:text-gray-100 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tokenCopied ? t.copied : t.copy}
          </button>
        </div>
      </div>
    </div>
  );
}
