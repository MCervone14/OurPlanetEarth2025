import * as migration_20250407_222812_Init from './20250407_222812_Init';

export const migrations = [
  {
    up: migration_20250407_222812_Init.up,
    down: migration_20250407_222812_Init.down,
    name: '20250407_222812_Init'
  },
];
