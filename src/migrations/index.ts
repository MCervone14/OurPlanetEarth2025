import * as migration_20250407_232447_Init from './20250407_232447_Init';

export const migrations = [
  {
    up: migration_20250407_232447_Init.up,
    down: migration_20250407_232447_Init.down,
    name: '20250407_232447_Init'
  },
];
