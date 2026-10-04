import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mothenary: ["var(--font-script)", "cursive"],
        tanPearl: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        violentica: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
