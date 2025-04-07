import * as migration_20250407_200958_Init from './20250407_200958_Init';

export const migrations = [
  {
    up: migration_20250407_200958_Init.up,
    down: migration_20250407_200958_Init.down,
    name: '20250407_200958_Init'
  },
];
