import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mothenary: ["Mothenary", "var(--font-montaga)", "serif"],
        tanPearl: ["TanPearl", "var(--font-montaga)", "serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        violentica: ["Violentica", "var(--font-montaga)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
