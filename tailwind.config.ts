import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mothenary: ["Mothenary", "serif"],
        tanPearl: ["TanPearl", "serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        violentica: ["Violentica", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
