// Password generation utilities

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  number: boolean;
  symbol: boolean;
}

export function generatePassword(opts: PasswordOptions): string {
  const pools: string[] = [];
  if (opts.lower) pools.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.upper) pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.number) pools.push("0123456789");
  if (opts.symbol) pools.push("!@#$%^&*()_+-=[]{}|;:,.<>?");

  if (pools.length === 0) {
    return "";
  }

  const chars = pools.join("");
  return Array.from({ length: opts.length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

export function calculateStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  return Math.min(strength, 7);
}

export function getStrengthLabel(strength: number): string {
  if (strength <= 2) return "Very Weak";
  if (strength <= 3) return "Weak";
  if (strength <= 4) return "Fair";
  if (strength <= 5) return "Good";
  if (strength <= 6) return "Strong";
  return "Very Strong";
}

export function getStrengthColor(strength: number): string {
  if (strength <= 2) return "bg-red-500";
  if (strength <= 3) return "bg-orange-500";
  if (strength <= 4) return "bg-yellow-500";
  if (strength <= 5) return "bg-blue-500";
  if (strength <= 6) return "bg-green-500";
  return "bg-emerald-600";
}
