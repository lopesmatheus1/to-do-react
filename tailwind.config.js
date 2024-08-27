/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'], // Define os arquivos onde Tailwind CSS deve buscar classes CSS.
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {}, // Este é o local onde você pode estender temas padrão do Tailwind CSS.
  },
  plugins: [], // Aqui você pode adicionar plugins para estender a funcionalidade do Tailwind CSS.
}
