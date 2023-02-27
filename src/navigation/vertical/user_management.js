// ** Icons Import
import {  Circle, Settings, Shield, User } from 'react-feather'

const check = (permission) => {
  const user = JSON.parse(localStorage.getItem('userData'))
  const permissions = JSON.parse(localStorage.getItem('userPermission'))
  if (permission) {    
    if (permissions?.some(value => permission.includes(value)) || user?.role === "Admin") {      
      return true
    } else {
      return false
    }
  }    
  return true
}

export default [
  {
    header: 'User Management',
    isAccess: check(['employees_access', 'designations_access', 'roles_access', 'divisions_access', 'departments_access'])
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    isAccess: check(['employees_access']),
    navLink: '/apps/user'
  }, 
  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    icon: <Shield size={20} />,
    isAccess: check(['roles_access']),
    children: [
      {
        id: 'roles',
        title: 'Roles',
        icon: <Circle size={12} />,
        isAccess: check(['roles_access']),
        navLink: '/apps/roles'
      }
    ]
  },
  {
    id: 'hrms',
    title: 'HRMS',
    icon: <Settings size={20} />,
    isAccess: check(['divisions_access', 'departments_access', 'designations_access']),
    children: [
      {
        id: 'division',
        title: 'Division',
        icon: <Circle size={12} />,
        isAccess: check(['divisions_access']),
        navLink: '/apps/division'
      },
      {
        id: 'department',
        title: 'Department',
        icon: <Circle size={12} />,
        isAccess: check(['departments_access']),
        navLink: '/apps/department'
      },
      {
        id: 'designation',
        title: 'Designation',
        icon: <Circle size={12} />,
        isAccess: check(['designations_access']),
        navLink: '/apps/designation'
      }
    ]
  }
]
