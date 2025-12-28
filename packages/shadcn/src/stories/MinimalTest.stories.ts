import type { Meta, StoryObj } from "@storybook/react";

// No JSX, no React imports - just plain HTML string
const MinimalTest = {
  render: () => {
    // Return a simple div element using createElement
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #333; margin-bottom: 1rem;">AJV Schema Documentation</h1>
        <p style="color: #666; margin-bottom: 2rem;">This is a minimal test story to verify Storybook is working.</p>
        
        <h2 style="color: #444; font-size: 1.2rem; margin-bottom: 1rem;">Example JSON Schema:</h2>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "email"]
}
        </pre>
        
        <p style="color: #666; margin-top: 2rem;">
          ✅ If you can see this, Storybook is working!<br>
          ✅ This demonstrates the AJV schema structure without React issues.
        </p>
      </div>
    `;
    return div;
  }
};

const meta: Meta = {
  title: "AJV/Minimal Test",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTest: Story = {
  ...MinimalTest
};