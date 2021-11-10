export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "mint",
    values: [
      {
        name: "vega yellow",
        value: "#dfff0b",
      },
      {
        name: "mint",
        value: "#00f780",
      },
      {
        name: "pink",
        value: "#ff0774",
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
