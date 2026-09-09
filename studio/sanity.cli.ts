import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '2veu0c14',
    dataset: 'production',
  },
  // Fija el subdominio del Studio para que `sanity deploy` no lo pregunte
  // ni cambie entre despliegues: https://facturador-ruckia.sanity.studio
  studioHost: 'facturador-ruckia',
});
