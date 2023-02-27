// ** Icons Import
import { Circle, TrendingUp } from "react-feather"

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
    header: "KPI",
    isAccess: true
  },
  {
    id: "kpi",
    title: "KPI",
    icon: <TrendingUp size={20} />,
    isAccess: true,
    children: [
      {
        id: "kpi-profile",
        title: "Profile",
        icon: <Circle size={20} />,
        isAccess: true,
        navLink: "/apps/kpi/profile"
      },
      {
        id: "kpi-window",
        title: "KPI Window",
        icon: <Circle size={20} />,
        isAccess: true,
        navLink: "/apps/kpi/kpi-window"
      },
      {
        id: "kpi-evaluation",
        title: "KPI Evaluation",
        icon: <Circle size={20} />,
        isAccess: true,
        navLink: "/apps/kpi/kpi-evaluation"
      },
      {
        id: "window",
        title: "Window",
        icon: <Circle size={20} />,
        isAccess: check(["window_access"]),
        navLink: "/apps/kpi/windows"
      },
      {
        id: "settings",
        title: "Settings",
        icon: <Circle size={20} />,
        isAccess: check([
          "period_access",
          "master_settings_access"
        ]),
        children: [
          {
            id: "period-type",
            title: "Period Type",
            icon: <Circle size={12} />,
            isAccess: check(["period_access"]),
            navLink: "/apps/kpi/periods"
          },
          {
            id: "master-settings",
            title: "Master Settings",
            icon: <Circle size={12} />,
            isAccess: check(["master_settings_access"]),
            children: [
              {
                id: "preference",
                title: "Preference",
                icon: <Circle size={12} />,
                isAccess: true,
                navLink: "/apps/kpi/master-settings/preference"
              },
              {
                id: "department-settings",
                title: "Departments",
                icon: <Circle size={12} />,
                isAccess: true,
                navLink: "/apps/kpi/master-settings/department-settings"
              },
              {
                id: "access",
                title: "Access",
                icon: <Circle size={12} />,
                isAccess: JSON.parse(localStorage.getItem('userData'))?.role === "Admin",
                navLink: "/apps/kpi/master-settings/access"
              }
            ]
          }
        ]
      }
    ]
  }
]