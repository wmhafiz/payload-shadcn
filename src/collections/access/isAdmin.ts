import type { Access } from 'payload/config'

import { checkRole } from './checkRole'

const isAdmin: Access = ({ req: { user } }) => checkRole(['admin'], user)

export default isAdmin
