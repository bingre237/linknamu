import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 따뜻한 배경 톤
        cream: "#FFF8F1",
        apricot: "#FCE3D3",
        ember: { 900: "#1C1613", 800: "#2A201B" },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
