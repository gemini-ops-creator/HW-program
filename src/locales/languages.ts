export const languages = ["en", "ru", "es"] as const;

export type Language = (typeof languages)[number];
