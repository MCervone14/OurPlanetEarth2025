import * as migration_20250407_232447_Init from './20250407_232447_Init'
import * as migration_20250409_191938_AccessRules from './20250409_191938_AccessRules'
import * as migration_20250413_215503_AddedImageBlur from './20250413_215503_AddedImageBlur'
import * as migration_20250416_213846_AuthorSlug from './20250416_213846_AuthorSlug'

export const migrations = [
  {
    up: migration_20250407_232447_Init.up,
    down: migration_20250407_232447_Init.down,
    name: '20250407_232447_Init',
  },
  {
    up: migration_20250409_191938_AccessRules.up,
    down: migration_20250409_191938_AccessRules.down,
    name: '20250409_191938_AccessRules',
  },
  {
    up: migration_20250413_215503_AddedImageBlur.up,
    down: migration_20250413_215503_AddedImageBlur.down,
    name: '20250413_215503_AddedImageBlur',
  },
  {
    up: migration_20250416_213846_AuthorSlug.up,
    down: migration_20250416_213846_AuthorSlug.down,
    name: '20250416_213846_AuthorSlug',
  },
]
