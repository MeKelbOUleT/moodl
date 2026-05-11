import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';

import {schema} from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'moodl-studio',
  title: 'Moodl — Atelier',
  projectId: 'bw1frczz',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Atelier Moodl')
          .items([
            S.listItem()
              .title('Paramètres du site')
              .child(
                S.document().schemaType('settings').documentId('siteSettings'),
              ),
            S.divider(),
            S.documentTypeListItem('programme').title('Programmes'),
            S.documentTypeListItem('lieu').title('Lieux (modèles)'),
            S.documentTypeListItem('article').title('Journal'),
            S.documentTypeListItem('temoignage').title('Témoignages'),
          ]),
    }),
    visionTool(),
  ],
  schema,
});
