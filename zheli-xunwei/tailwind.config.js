/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B8C85',
        'primary-dark': '#4A7A74',
        'warm-apricot': '#F5E6C8',
        'sauce-red': '#A64B45',
        'bamboo-green': '#7CB342',
        'bg-paper': '#F8F5F0',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'text-muted': '#999999',
      },
      fontFamily: {
        display: ['"Ma Shan Zheng"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(91, 140, 133, 0.1)',
      },
      borderRadius: {
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'drawer-in': {
          '0%': { transform: 'translateX(24px)', opacity: '0' },
          '100%': { transform: 'translateX(0px)', opacity: '1' },
        },
        'drawer-out': {
          '0%': { transform: 'translateX(0px)', opacity: '1' },
          '100%': { transform: 'translateX(24px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drift: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.95)' },
          '30%': { opacity: '0.35' },
          '100%': { opacity: '0', transform: 'translateY(-22px) scale(1.08)' },
        },
        'press-down': {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '100%': { transform: 'translateY(1px) scale(0.98)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
        'drawer-in': 'drawer-in 320ms ease-out both',
        'drawer-out': 'drawer-out 240ms ease-in both',
        float: 'float 3s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        steam: 'steam 2.4s ease-in-out infinite',
        'pop-in': 'pop-in 220ms ease-out both',
      },
    },
  },
  plugins: [],
}
