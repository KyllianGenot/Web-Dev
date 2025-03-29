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
        // Ensure icons inherit color and have no default background
        'background-color': 'transparent',
        'color': 'inherit',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,500,600,700", // Added weights for more flexibility
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#1E3A8A", // blue-800
        dark: "#1D4ED8",    // blue-700 (Slightly brighter dark for better hover)
        light: "#3B82F6",   // blue-500
        lighter: "#60A5FA", // blue-400
        lightest: "#EFF6FF", // blue-50
      },
      secondary: {
        DEFAULT: "#6B7280", // gray-500
        dark: "#4B5563",    // gray-600
        light: "#9CA3AF",   // gray-400
        lighter: "#D1D5DB", // gray-300
        lightest: "#F3F4F6", // gray-100
      },
      danger: {
        DEFAULT: "#DC2626", // red-600
        dark: "#B91C1C",    // red-700
        light: "#F87171",   // red-400
        lighter: "#FCA5A5", // red-300
        lightest: "#FEE2E2", // red-100
      },
      // Use a slightly off-white background for better contrast with white cards
      background: "#F9FAFB", // gray-50
    },
    // Optional: Add border radius consistency
    borderRadius: {
      'lg': '0.5rem', // Default lg
      'xl': '0.75rem', // Default xl
      '2xl': '1rem', // Default 2xl
    },
  },
  shortcuts: {
    // Base button style
    "btn": "px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    // Variants
    "btn-primary": "btn bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
    "btn-secondary": "btn bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light",
    "btn-danger": "btn bg-danger text-white hover:bg-danger-dark focus:ring-danger-light",
    "btn-outline-secondary": "btn bg-transparent text-secondary border border-secondary hover:bg-secondary-lightest focus:ring-secondary-light",
    "btn-ghost": "btn bg-transparent hover:bg-gray-100 focus:ring-primary-light text-gray-700",
    // Icon Button (minimal padding, rounded)
    "btn-icon": "p-1.5 rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1",
    "btn-icon-secondary": "btn-icon text-secondary hover:text-primary hover:bg-primary-lightest focus:ring-primary-light",
    "btn-icon-danger": "btn-icon text-danger hover:text-danger-dark hover:bg-danger-lightest focus:ring-danger-light",
    // Card
    "card": "bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200",
    // Input field
    "input": "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light text-gray-900 bg-white placeholder:text-gray-400 transition-colors duration-150 ease-in-out",
    // Form Label
    "form-label": "block text-sm font-medium text-gray-700 mb-1",
    // Error Message Box
    "error-box": "bg-danger-lightest text-danger-dark p-3 rounded-lg text-sm text-center",
  },
  safelist: "prose m-auto text-left".split(" "),
});