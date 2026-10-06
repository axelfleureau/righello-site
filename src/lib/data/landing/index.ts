import type { Landing } from './types';

export type { Landing, Chapter, Feature, Demo, Metric, MediaRef, TechItem, IconName } from './types';

// Un file per prodotto (landing/<id>.ts, export default): niente registro da aggiornare a mano.
const files = import.meta.glob<{ default: Landing }>('./*.ts', { eager: true });

const byId: Record<string, Landing> = {};
for (const [path, mod] of Object.entries(files)) {
  const id = path.replace('./', '').replace('.ts', '');
  if (id === 'index' || id === 'types') continue;
  byId[id] = mod.default;
}

export const getLanding = (id: string): Landing | undefined => byId[id];
