import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
        colors: {
            'color-green': '#4BB42D',
            'color-green-dark': '#008000'
        },
        screens: {
            '2xl': '1440px'
        }
    }
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
