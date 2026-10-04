import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mothenary: ["Brush Script MT", "Segoe Script", "cursive"],
        tanPearl: ["Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        violentica: ["Brush Script MT", "Segoe Script", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
