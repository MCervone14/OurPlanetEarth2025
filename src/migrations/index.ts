import * as migration_20250407_232447_Init from './20250407_232447_Init';
import * as migration_20250409_191938_AccessRules from './20250409_191938_AccessRules';
import * as migration_20250413_215503_AddedImageBlur from './20250413_215503_AddedImageBlur';
import * as migration_20250416_182618_AuthorSlug from './20250416_182618_AuthorSlug';
import * as migration_20250416_200728_newAuthorSlug from './20250416_200728_newAuthorSlug';
import * as migration_20250416_204138 from './20250416_204138';

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
    up: migration_20250416_182618_AuthorSlug.up,
    down: migration_20250416_182618_AuthorSlug.down,
    name: '20250416_182618_AuthorSlug',
  },
  {
    up: migration_20250416_200728_newAuthorSlug.up,
    down: migration_20250416_200728_newAuthorSlug.down,
    name: '20250416_200728_newAuthorSlug',
  },
  {
    up: migration_20250416_204138.up,
    down: migration_20250416_204138.down,
    name: '20250416_204138'
  },
];
