import * as migration_20250407_230224_Init from './20250407_230224_Init';

export const migrations = [
  {
    up: migration_20250407_230224_Init.up,
    down: migration_20250407_230224_Init.down,
    name: '20250407_230224_Init'
  },
];
