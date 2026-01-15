// Password strength indicator component

import { getStrengthColor } from "../utils/password";
import { useLanguage } from "../hooks/useLanguage";

interface StrengthBarProps {
  strength: number;
}

const getStrengthLabel = (strength: number, t: any): string => {
  if (strength <= 2) return t.veryWeak;
  if (strength <= 3) return t.weak;
  if (strength <= 4) return t.fair;
  if (strength <= 5) return t.good;
  if (strength <= 6) return t.strongLabel;
  return t.veryStrong;
};

export function StrengthBar({ strength }: StrengthBarProps) {
  const { t } = useLanguage();
  const maxStrength = 7;
  const percentage = (strength / maxStrength) * 100;
  const color = getStrengthColor(strength);
  const label = getStrengthLabel(strength, t);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.strength}:</span>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
