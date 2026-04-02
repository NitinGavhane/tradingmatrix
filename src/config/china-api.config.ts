// src/config/china-api.config.ts
export const chinaApiConfig = {
  baseUrl: process.env.CHINA_API_BASE_URL || "",
  apiKey: process.env.CHINA_API_KEY || "",
  refreshIntervalMs: 1000 * 60 * 60, // 1 hour
} as const;
