import type { Access } from 'payload/config'

export const isSelf: Access = ({ req: { user } }) => {
  if (user) {
    return {
      user: {
        equals: user.id,
      },
    }
  }
  return false
}

export default isSelf
