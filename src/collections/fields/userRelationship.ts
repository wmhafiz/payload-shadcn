import type { Field } from 'payload/types'
import { User } from 'payload-types'

export const userRelationship: Field = {
  name: 'user',
  type: 'relationship',
  hasMany: false,
  relationTo: 'users',
  defaultValue: ({ user }: { user: User }) => user,
  required: true,
}
