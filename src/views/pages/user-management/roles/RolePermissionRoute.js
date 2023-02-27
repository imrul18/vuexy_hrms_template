// ** React Imports
import { lazy } from 'react'

const Roles = lazy(() => import('./roles'))
const Permissions = lazy(() => import('./permissions'))


const RolePermissionRoute = [  
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  }
]

export default RolePermissionRoute
