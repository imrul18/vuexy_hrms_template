// ** React Imports
import { lazy } from 'react'

const DivisionList = lazy(() => import('./division/list'))
const DepartmentList = lazy(() => import('./department/list'))
const DesignationList = lazy(() => import('./designation/list'))


const HrmsRoute = [  
  {
    element: <DivisionList />,
    path: '/apps/division'
  },
  {
    element: <DepartmentList />,
    path: '/apps/department'
  },
  {
    element: <DesignationList />,
    path: '/apps/designation'
  }
]

export default HrmsRoute
