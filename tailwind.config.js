/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      boxShadow: {
        dataCard: '6px 10px 34px 1px rgba(0, 0, 0, 0.08)',
      },
    },
    colors: {
      primary: '#f9fcfa',
      secondary: '#007f5f',
      'black-zapp': '#121212',
      'aqua-gem': '#1af3cf',
      'seabed-green': '#093331',
      'night-sky-blue': '#14213d',
      flame: '#fb5607',
      sunshine: '#ffb703',
      'light-grey': '#f0f0f0',
      grey: '#7d7d7d',
      'blue-link': '#0077cc',
      'seperator-line': '#a19f9f',
      'card-background': '#f6f6f6',
      'card-stroke': '#d6d6d6',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      mid: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      giga: '2.5rem',
      h1: '2.25rem',
      h2: '2rem',
      h3: '1.75rem',
    },
    opacity: {
      10: '0.1',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      70: '0.7',
      80: '0.8',
      90: '0.9',
    },
  },
  plugins: [],
  corePlugins: {
    placeholderColor: false, // poistaa placeholder-värien validoinnin, joka aiheuttaa konfliktin
  },
};
