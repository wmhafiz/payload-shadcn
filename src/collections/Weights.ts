import type { CollectionConfig } from 'payload/types'
import { userRelationship } from './fields/userRelationship'
import isSelf from './access/isSelf'

export const Weights: CollectionConfig = {
  slug: 'weights',
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
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data }: any) => {
            const { id, date, user } = data
            const logDate = new Date(date)
            return `${id}-${user}-${logDate.toISOString().split('T')[0]}`
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
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
    },
    {
      name: 'photo',
      label: 'Progress Photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
