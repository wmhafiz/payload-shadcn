import type { CollectionConfig } from 'payload/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { userRelationship } from './fields/userRelationship'
import isSelf from './access/isSelf'

export const Diary: CollectionConfig = {
  slug: 'diaries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['id', 'title'],
    group: 'Log Progress',
  },
  access: {
    read: isSelf,
    create: isSelf,
    update: isSelf,
    delete: isSelf,
  },
  fields: [
    userRelationship,
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }: any) => {
            const { id, createdAt, user, type } = data
            const date = new Date(createdAt)
            return `${id}-${type}-${user}-${date.toISOString().split('T')[0]}`
          },
        ],
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      defaultValue: () => new Date(),
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Breakfast',
          value: 'breakfast',
        },
        {
          label: 'Lunch',
          value: 'lunch',
        },
        {
          label: 'Dinner',
          value: 'dinner',
        },
        {
          label: 'Snacks',
          value: 'snacks',
        },
      ],
      required: true,
    },
    {
      type: 'number',
      name: 'total_calories',
      label: 'Total Calories (cal)',
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          async ({ data }: any) => {
            const payload = await getPayload({
              config: configPromise,
            })

            let total = 0
            for (const row of data.meals) {
              const { meal, number_of_servings } = row
              const result = await payload.findByID({
                collection: 'meals',
                id: meal,
              })
              total += result.calorie * number_of_servings
            }
            return total
          },
        ],
      },
    },
    {
      name: 'meals',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'meal',
          label: 'Meals',
          type: 'relationship',
          relationTo: 'meals',
        },
        {
          name: 'number_of_servings',
          type: 'number',
          defaultValue: 1,
          label: 'Number of Servings',
        },
      ],
    },
  ],
}
