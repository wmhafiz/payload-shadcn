import type { CollectionConfig } from 'payload/types'
import { userRelationship } from './fields/userRelationship'
import isSelf from './access/isSelf'

export const Exercises: CollectionConfig = {
  slug: 'exercises',
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
            const { id, date, user } = data
            const workoutDate = new Date(date)
            return `${id}-Workout-${user}-${workoutDate.toISOString().split('T')[0]}`
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
      type: 'number',
      name: 'total_calories',
      label: 'Total Calories (cal)',
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data }) =>
            data?.workouts?.reduce((prev: number, curr: any) => prev + curr.calorie_burned, 0),
        ],
      },
    },
    {
      type: 'number',
      name: 'total_duration',
      label: 'Total Duration (minutes)',
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data }) =>
            data?.workouts?.reduce((prev: number, curr: any) => prev + curr.duration, 0),
        ],
      },
    },
    {
      name: 'workouts',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'workout',
          label: 'Workouts',
          type: 'relationship',
          relationTo: 'workouts',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: 30,
          label: 'Duration (minutes)',
        },
        {
          name: 'calorie_burned',
          type: 'number',
          defaultValue: 200,
          label: 'Calorie Burned (cal)',
        },
      ],
    },
  ],
}
