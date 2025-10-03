/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        'bg-dark': '#000000',
        'text-secondary': '#94A3B8',
        'border-dark': '#1E293B',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
