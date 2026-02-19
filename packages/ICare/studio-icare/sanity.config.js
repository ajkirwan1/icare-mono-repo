import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const sharedConfig = {
  projectId: '08fr3nyq',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
}

export default defineConfig([
  {
    ...sharedConfig,
    name: 'production',
    title: 'ICare (Production)',
    dataset: 'production',
    basePath: '/production',
  },
  {
    ...sharedConfig,
    name: 'develop',
    title: 'ICare (Development)',
    dataset: 'develop',
    basePath: '/development',
  },
])
