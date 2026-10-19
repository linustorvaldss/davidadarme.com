import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        theme: {
          background: "var(--theme-background)",
          foreground: "var(--theme-foreground)",
          muted: "var(--theme-muted)",
          border: "var(--theme-border)",
          surface: "var(--theme-surface)",
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
