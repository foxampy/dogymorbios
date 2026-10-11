import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDF6F0',
        surfacePrimary: '#FFF0E5',
        surfaceSecondary: '#FFE4D6',
        accentPrimary: '#FF9F89',
        accentSecondary: '#A8D5BA',
        textMain: '#4A403A',
        textMuted: '#8C817D',
        success: '#95D1CC',
        warning: '#FFD68A',
        // Альтернативная палитра из brand identity
        warmMilk: '#FDF8F5',
        cleanFur: '#FFFFFF',
        salmonTreat: '#FF8E72',
        freshGrass: '#88D498',
        darkChocolate: '#4D4038',
        dustyPaw: '#9E9089',
        redRubberBall: '#FF6B6B',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        plush: '24px',
        superPlush: '30px',
      },
      boxShadow: {
        claymorphism: 'inset 10px 10px 20px #e0d0c0, inset -10px -10px 20px #fff, 10px 20px 30px rgba(0,0,0,0.1)',
        claymorphismSoft: 'inset 5px 5px 10px rgba(0,0,0,0.05), inset -5px -5px 10px rgba(255,255,255,0.4), 5px 10px 20px rgba(0,0,0,0.08)',
        dugHole: 'inset 8px 8px 16px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.1)',
        squeakyToy: 'inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 10px rgba(255,255,255,0.4), 5px 10px 20px rgba(255,142,114,0.4)',
        levitate: '0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
export default config

