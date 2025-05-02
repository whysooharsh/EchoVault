/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          'pulse-wave': 'pulseWave 8s linear infinite',
        },
        keyframes: {
          pulseWave: {
            '0%': { strokeDashoffset: '1000' },
            '100%': { strokeDashoffset: '0' },
          },
        },
      },
    },
    plugins: [],
  };
  