import type {SchemaTypeDefinition} from 'sanity';

import {programmeType} from './programmeType';
import {lieuType} from './lieuType';
import {articleType} from './articleType';
import {temoignageType} from './temoignageType';
import {settingsType} from './settingsType';

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [programmeType, lieuType, articleType, temoignageType, settingsType],
};
