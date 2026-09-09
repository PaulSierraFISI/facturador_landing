import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Ruckia — Blog',
  projectId: '2veu0c14',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
