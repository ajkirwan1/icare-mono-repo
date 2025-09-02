import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import path from 'path';
import { reactOutputTarget } from '@stencil/react-output-target';


export const config: Config = {
  namespace: 'icare-components',
  plugins: [
    sass({
      includePaths: [path.resolve(__dirname, 'src/globals/styles')],
    }),
  ],
  globalStyle: 'src/globals/styles/_globals.scss',
  outputTargets: [
    reactOutputTarget({
      outDir: '../ICare/app/src/components/stencil-generated',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'test.html' },
        { src: '../public/images' , dest: 'images'},// Add this to copy test.html
      ],
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
