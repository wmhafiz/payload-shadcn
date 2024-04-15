import type { CollectionConfig } from 'payload/types'

import isAdminOrSelf from './access/isAdminOrSelf'
import isAnyone from './access/isAnyone'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'text',
    group: 'System',
  },
  upload: {
    imageSizes: [
      {
        name: 'banner',
        height: 600,
        width: 1600,
      },
      {
        name: 'card',
        height: 600,
        width: 800,
      },
      {
        name: 'avatar',
        height: 100,
        width: 100,
      },
    ],
    resizeOptions: {
      width: 2000,
    },
  },
  access: {
    read: isAnyone,
    create: isAnyone,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'text',
      label: 'Alt. Text',
      type: 'text',
    },
  ],
}
