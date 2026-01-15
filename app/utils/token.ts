// Token generation utilities

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function generateRandomToken(length: number = 32, encoding: "hex" | "base64" = "hex"): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  
  if (encoding === "hex") {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } else {
    // base64
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  }
}
