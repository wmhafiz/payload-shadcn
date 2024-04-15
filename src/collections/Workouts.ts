import type { CollectionConfig } from 'payload/types'

import isAdminOrSelf from './access/isAdminOrSelf'
import isAnyone from './access/isAnyone'

export const Workouts: CollectionConfig = {
  slug: 'workouts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['id', 'title', 'type'],
    group: 'Databases',
  },
  access: {
    read: isAnyone,
    create: isAnyone,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      hasMany: false,
      options: [
        {
          label: 'Cardio',
          value: 'cardio',
        },
        {
          label: 'Strength',
          value: 'strength',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
  ],
}
