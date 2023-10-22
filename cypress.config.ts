import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.NEXTAUTH_URL,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
