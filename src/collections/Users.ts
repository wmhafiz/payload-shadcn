import type { CollectionConfig } from 'payload/types'

import isAdmin from './access/isAdmin'
import isAdminOrSelf from './access/isAdminOrSelf'
import isAnyone from './access/isAnyone'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 28800, // 8 hours
  },
  admin: {
    useAsTitle: 'nickname',
    group: 'System',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'nickname',
          type: 'text',
          saveToJWT: true,
          required: true,
        },
        {
          name: 'roles',
          type: 'select',
          saveToJWT: true,
          hasMany: true,
          defaultValue: ['user'],
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'User',
              value: 'user',
            },
          ],
        },
      ],
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'exp',
          label: 'Total Experience Points',
          type: 'number',
          admin: {
            readOnly: true,
          },
          defaultValue: 0,
        },
        {
          name: 'level',
          label: 'Current Level',
          type: 'number',
          admin: {
            readOnly: true,
          },
          defaultValue: 1,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          description: 'Information about you',
          fields: [
            {
              name: 'firstName',
              type: 'text',
            },
            {
              name: 'lastName',
              type: 'text',
            },
            {
              name: 'dob',
              type: 'date',
              label: 'Date of Birth',
            },
            {
              name: 'gender',
              type: 'select',
              hasMany: false,
              options: [
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
              ],
            },
            {
              name: 'biodata',
              type: 'richText',
              label: 'Tell us something about yourself',
            },
          ],
        },
        {
          label: 'Current',
          description: 'Your current fitness state',
          fields: [
            {
              name: 'weight',
              type: 'number',
              label: 'Current Weight',
            },
            {
              name: 'height',
              type: 'number',
              label: 'Current Height',
            },
          ],
        },
        {
          label: 'Goals',
          description: 'Your fitness goals',
          fields: [
            {
              name: 'goal_type',
              label: 'Goal Type',
              type: 'select',
              hasMany: true,
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
              name: 'goal_weight',
              type: 'number',
              label: 'Ideal Weight (kg)',
            },
            {
              name: 'goal_daily_intake',
              type: 'number',
              label: 'Daily Calorie Intake (kcal)',
            },
            {
              name: 'goal_exercise_calorie_burned',
              type: 'number',
              defaultValue: 500,
              label: 'Calorie Burned Per Exercise (kcal)',
            },
            {
              name: 'goal_weekly_exercise',
              type: 'number',
              defaultValue: 3,
              label: 'How Many Exercise Per Week?',
            },
            {
              name: 'goal_date',
              type: 'date',
              label: 'When is the target to hit this goal?',
            },
          ],
        },
      ],
    },
  ],
}
