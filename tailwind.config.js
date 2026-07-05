/** @type {import('tailwindcss').Config} */
export default {
  // сканируем разметку и JS — оттуда Tailwind берёт используемые классы
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        ink:      '#0A1A33',   // глубокий синий — основной текст / тёмные секции
        navy:     '#0E2A52',
        steel:    '#33507D',
        teal:     '#13B7B0',   // бирюзовый акцент
        'teal-d': '#0C8A85',
        amber:    '#FF7A3D',   // оранжевый CTA
        'amber-d':'#EA5F1F',
        paper:    '#F6F8FC',   // светлый фон "воздуха"
        mist:     '#E7EDF6',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10,26,51,0.18)',
        lift: '0 24px 60px -18px rgba(10,26,51,0.28)',
      },
    },
  },
  plugins: [],
}
