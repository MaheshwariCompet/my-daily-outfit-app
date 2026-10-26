/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#f8f9ff',
        'surface-dim': '#cbdbf5',
        'surface-bright': '#f8f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#43474f',
        primary: '#30568b',
        'primary-container': '#4a6fa5',
        'on-primary': '#ffffff',
        'on-primary-container': '#edf1ff',
        secondary: '#4e6073',
        'secondary-container': '#cfe2f9',
        'on-secondary-container': '#091d2e',
        tertiary: '#764d1a',
        'tertiary-fixed': '#ffddbb',
        'tertiary-fixed-dim': '#f5bc7e',
        'on-tertiary-fixed': '#2b1700',
        'outline-variant': '#c3c6d1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
