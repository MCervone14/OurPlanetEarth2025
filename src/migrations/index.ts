import * as migration_20250407_232447_Init from './20250407_232447_Init';
import * as migration_20250409_191938_AccessRules from './20250409_191938_AccessRules';

export const migrations = [
  {
    up: migration_20250407_232447_Init.up,
    down: migration_20250407_232447_Init.down,
    name: '20250407_232447_Init',
  },
  {
    up: migration_20250409_191938_AccessRules.up,
    down: migration_20250409_191938_AccessRules.down,
    name: '20250409_191938_AccessRules'
  },
];
