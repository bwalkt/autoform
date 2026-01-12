import type { Preview } from "@storybook/react-vite";
import "../src/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        order: ["Typography", "Layouts", "Elements", "*"],
      },
    },
  },
};

export default preview;
