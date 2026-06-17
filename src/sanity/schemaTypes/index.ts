import type {SchemaTypeDefinition} from 'sanity';

import {programmeType} from './programmeType';
import {lieuType} from './lieuType';
import {articleType} from './articleType';
import {temoignageType} from './temoignageType';
import {settingsType} from './settingsType';
import {teamMemberType} from './teamMemberType';
import {faqType} from './faqType';

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [programmeType, lieuType, articleType, temoignageType, settingsType, teamMemberType, faqType],
};
