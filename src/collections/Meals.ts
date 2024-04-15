import type { CollectionConfig } from 'payload/types'

import isAdminOrSelf from './access/isAdminOrSelf'
import isAnyone from './access/isAnyone'

export const Meals: CollectionConfig = {
  slug: 'meals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['id', 'title'],
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
      defaultValue: 'Food',
      options: [
        {
          label: 'Food',
          value: 'food',
        },
        {
          label: 'Drinks',
          value: 'drinks',
        },
      ],
    },
    {
      name: 'image',
      label: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'serving_size',
          label: 'Serving Size (e.g. 1 plate)',
          type: 'text',
          required: true,
        },
        {
          name: 'calorie',
          type: 'number',
          required: true,
          label: 'Calorie (kcal)',
        },
        {
          name: 'carbs',
          type: 'number',
          label: 'Carvs (g)',
        },
        {
          name: 'fat',
          type: 'number',
          label: 'Fat (g)',
        },
        {
          name: 'protein',
          type: 'number',
          label: 'Protein (g)',
        },
      ],
    },
  ],
}
