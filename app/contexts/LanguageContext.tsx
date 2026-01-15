// Language context for i18n

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "vi";

const translations = {
  en: {
    // Header
    title: "🔐 Password & Token Generator",
    toggleTheme: "Toggle theme",
    dark: "🌙 Dark",
    light: "☀️ Light",

    // Home page
    description:
      "A 100% client-side developer utility for generating secure passwords, tokens, UUIDs, and hashes.",
    subtitle: "No backend. No tracking. Just fast, local, and secure.",
    footer: "Built with React + TypeScript + Tailwind CSS",

    // Password Generator
    passwordGenerator: "Password Generator",
    strong: "Strong",
    medium: "Medium",
    simple: "Simple",
    length: "Length",
    lowercase: "Lowercase (a-z)",
    uppercase: "Uppercase (A-Z)",
    numbers: "Numbers (0-9)",
    special: "Special (!@#$...)",
    copy: "Copy",
    copied: "Copied!",
    regenerate: "Regenerate",
    strength: "Strength",
    veryWeak: "Very Weak",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strongLabel: "Strong",
    veryStrong: "Very Strong",
    dontUsePasswords: "Don't use passwords like this!",
    weakPasswordsWarning: "These passwords can be cracked in seconds:",
    useGeneratorTip:
      "💡 Use our password generator to create stronger passwords!",
    funFact: "Fun fact:",
    funFactText:
      '"password" and "123456" are still the 2 most common passwords in the world. Don\'t become part of this statistic! 😅',

    // Token Generator
    tokenGenerator: "Token Generator",
    uuidv4: "UUID v4",
    randomToken: "Random Token",
    generate: "Generate",
    clickGenerate: "Click Generate to create UUID",
    clickGenerateToken: "Click Generate to create token",
    hex: "Hex",
    base64: "Base64",

    // Hash Generator
    hashGenerator: "Hash Generator",
    hashDescription: "SHA-256 hashing via Web Crypto API",
    inputText: "Input Text",
    sha256Hash: "SHA-256 Hash",
    enterTextToHash: "Enter text to hash...",
    hashWillAppear: "Hash will appear here",
    generating: "Generating...",
  },
  vi: {
    // Header
    title: "🔐 Trình Tạo Mật Khẩu & Token",
    toggleTheme: "Chuyển đổi giao diện",
    dark: "🌙 Tối",
    light: "☀️ Sáng",

    // Home page
    description:
      "Công cụ 100% phía client để tạo mật khẩu, token, UUID và hash an toàn.",
    subtitle: "Không backend. Không theo dõi. Chỉ nhanh, local và an toàn.",
    footer: "Được xây dựng với React + TypeScript + Tailwind CSS",

    // Password Generator
    passwordGenerator: "Trình Tạo Mật Khẩu",
    strong: "Mạnh",
    medium: "Trung Bình",
    simple: "Đơn Giản",
    length: "Độ Dài",
    lowercase: "Chữ thường (a-z)",
    uppercase: "Chữ hoa (A-Z)",
    numbers: "Số (0-9)",
    special: "Ký tự đặc biệt (!@#$...)",
    copy: "Sao Chép",
    copied: "Đã Sao Chép!",
    regenerate: "Tạo Lại",
    strength: "Độ Mạnh",
    veryWeak: "Rất Yếu",
    weak: "Yếu",
    fair: "Trung Bình",
    good: "Tốt",
    strongLabel: "Mạnh",
    veryStrong: "Rất Mạnh",
    dontUsePasswords: "Đừng đặt password như thế này!",
    weakPasswordsWarning: "Những password này có thể bị crack trong vài giây:",
    useGeneratorTip:
      "💡 Hãy dùng password generator của chúng tôi để tạo password mạnh hơn!",
    funFact: "Sự thật thú vị:",
    funFactText:
      '"password" và "123456" vẫn đang là 2 password phổ biến nhất trên thế giới. Đừng trở thành một phần của thống kê này! 😅',

    // Token Generator
    tokenGenerator: "Trình Tạo Token",
    uuidv4: "UUID v4",
    randomToken: "Token Ngẫu Nhiên",
    generate: "Tạo",
    clickGenerate: "Nhấn Tạo để tạo UUID",
    clickGenerateToken: "Nhấn Tạo để tạo token",
    hex: "Hex",
    base64: "Base64",

    // Hash Generator
    hashGenerator: "Trình Tạo Hash",
    hashDescription: "Tạo hash SHA-256 qua Web Crypto API",
    inputText: "Văn Bản Đầu Vào",
    sha256Hash: "Hash SHA-256",
    enterTextToHash: "Nhập văn bản để hash...",
    hashWillAppear: "Hash sẽ xuất hiện ở đây",
    generating: "Đang tạo...",
  },
};

interface LanguageContextType {
  language: Language;
  t: typeof translations.en;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "en" for SSR to match server render
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only read from localStorage after mount (client-side only)
    setMounted(true);
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "vi" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    if (!mounted) return;
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        t: translations[language],
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
