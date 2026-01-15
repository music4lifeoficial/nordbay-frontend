export function getLocale(): "da" | "en" {
  // TODO: Detect locale from Next.js router, cookies, or browser
  // Default to Danish
  if (typeof window !== "undefined") {
    const lang = navigator.language?.slice(0, 2);
    if (lang === "en") return "en";
  }
  return "da";
}
