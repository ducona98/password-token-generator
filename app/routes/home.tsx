import { HashGenerator } from "../components/HashGenerator";
import { PasswordGenerator } from "../components/PasswordGenerator";
import { TokenGenerator } from "../components/TokenGenerator";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import type { Route } from "./+types/home";

export default function Home({}: Route.ComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white"
            suppressHydrationWarning
          >
            {t.title}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer font-medium text-sm"
              aria-label="Toggle language"
              suppressHydrationWarning
            >
              <span suppressHydrationWarning>
                {language === "en" ? "🇻🇳 VI" : "🇺🇸 EN"}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer font-medium text-sm"
              aria-label={t.toggleTheme}
              suppressHydrationWarning
            >
              <span suppressHydrationWarning>
                {theme === "light" ? t.dark : t.light}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <p className="text-gray-700 dark:text-gray-300">{t.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t.subtitle}
            </p>
          </div>

          <PasswordGenerator />
          <TokenGenerator />
          <HashGenerator />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
