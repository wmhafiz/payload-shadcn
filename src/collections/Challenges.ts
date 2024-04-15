import type { CollectionConfig } from 'payload/types'

import isAdmin from './access/isAdmin'
import isAdminOrSelf from './access/isAdminOrSelf'
import isAnyone from './access/isAnyone'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  admin: {
    useAsTitle: 'title',
    group: 'Stay Motivated',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            {
              label: 'Weight Loss',
              value: 'weight_loss',
            },
            {
              label: 'Muscle Gain',
              value: 'muscle_gain',
            },
            {
              label: 'Running Distance',
              value: 'running_distance',
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            {
              label: 'Not Started',
              value: 'not_started',
            },
            {
              label: 'Ongoing',
              value: 'ongoing',
            },
            {
              label: 'Completed',
              value: 'completed',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'start_date',
          type: 'date',
          label: 'Start Date',
        },
        {
          name: 'end_date',
          type: 'date',
          label: 'End Date',
        },
      ],
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
