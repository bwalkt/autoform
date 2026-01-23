import type { Preview } from '@storybook/react-vite'
import '../src/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Typography', 'Layouts', 'Elements', 'Form', '*'],
      },
    },
  },
}

export default preview
