import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': "inline-block",
        'vertical-align': "middle",
        'background-color': 'transparent',
        'color': 'inherit',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,500,600,700",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#1E3A8A",
        dark: "#1D4ED8",
        light: "#3B82F6",
        lighter: "#60A5FA",
        lightest: "#EFF6FF",
      },
      secondary: {
        DEFAULT: "#6B7280",
        dark: "#4B5563",
        light: "#9CA3AF",
        lighter: "#D1D5DB",
        lightest: "#F3F4F6",
      },
      danger: {
        DEFAULT: "#DC2626",
        dark: "#B91C1C",
        light: "#F87171",
        lighter: "#FCA5A5",
        lightest: "#FEE2E2",
      },
      background: "#F9FAFB",
    },
    borderRadius: {
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
    },
  },
  shortcuts: {
    "btn": "px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    "btn-primary": "btn bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
    "btn-secondary": "btn bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light",
    "btn-danger": "btn bg-danger text-white hover:bg-danger-dark focus:ring-danger-light",
    "btn-outline-secondary": "btn bg-transparent text-secondary border border-secondary hover:bg-secondary-lightest focus:ring-secondary-light",
    "btn-ghost": "btn bg-transparent hover:bg-gray-100 focus:ring-primary-light text-gray-700",
    "btn-icon": "p-1.5 rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1",
    "btn-icon-secondary": "btn-icon text-secondary hover:text-primary hover:bg-primary-lightest focus:ring-primary-light",
    "btn-icon-danger": "btn-icon text-danger hover:text-danger-dark hover:bg-danger-lightest focus:ring-danger-light",
    "card": "bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200",
    "input": "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light text-gray-900 bg-white placeholder:text-gray-400 transition-colors duration-150 ease-in-out",
    "form-label": "block text-sm font-medium text-gray-700 mb-1",
    "error-box": "bg-danger-lightest text-danger-dark p-3 rounded-lg text-sm text-center",
  },
  safelist: "prose m-auto text-left".split(" "),
});