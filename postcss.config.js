module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nested",
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
