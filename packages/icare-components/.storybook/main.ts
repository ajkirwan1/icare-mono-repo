import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import path from 'path';


const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/web-components-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          'icare-components': path.resolve(__dirname, '../dist'),
        },
      },
      server: {
        watch: {
          ignored: ['!**/dist/**'],
        },
      },
    });
  },
  
};
export default config;