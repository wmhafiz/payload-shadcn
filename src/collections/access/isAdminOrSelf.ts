import type { Access } from 'payload/config'
import { checkRole } from './checkRole'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (checkRole(['admin'], user)) {
      return true
    }

    // If any other type of user, only provide access to themselves
    return {
      user: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false
}

export default isAdminOrSelf
