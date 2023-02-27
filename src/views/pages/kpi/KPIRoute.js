import { lazy } from "react"

const GoalPreview = lazy(() => import("./KpiGlobalComponent/goalPreview"))

const Profile = lazy(() => import("./profile/windowList"))
const GoalSet = lazy(() => import("./profile/goalSet"))
const ProfileWindowView = lazy(() => import("./profile/windowView"))

const KPIWindow = lazy(() => import("./KPIWindow/windowList"))

const KPIEvaluation = lazy(() => import("./KPIEvaluation/windowList"))

const Windows = lazy(() => import("./windows/windowList"))
const WindowOpen = lazy(() => import("./windows/windowOpen"))
const WindowEdit = lazy(() => import("./windows/windowEdit"))
const WindowView = lazy(() => import("./windows/windowView"))
const WindowEmployee = lazy(() => import("./windows/windowEmployee"))

const Periods = lazy(() => import("./kpi-settings/periods/list"))
const Departments = lazy(() => import("./kpi-settings/periods/departments"))
const Preference = lazy(() => import("./kpi-settings/master-settings/preference"))
const DepartmentSettings = lazy(() => import("./kpi-settings/master-settings/department-settings"))
const Access = lazy(() => import("./kpi-settings/master-settings/access"))

const KPIRoute = [
  // Profile Start
  {
    element: <Profile />,
    path: "/apps/kpi/profile"
  },
  {
    element: <ProfileWindowView />,
    path: "/apps/kpi/profile/windowView/:id"
  },
  {
    element: <GoalSet />,
    path: "/apps/kpi/goal-set/:window_id"
  },
  {
    element: <GoalPreview />,
    path: "/apps/kpi/goal-preview/:employee_window_id"
  },
  // Profile End

  // KPI Window Start
  {
    element: <KPIWindow />,
    path: "/apps/kpi/kpi-window"
  },
  {
    element: <GoalPreview />,
    path: "/apps/kpi/window-employee-goal/:employee_window_id"
  },
  // KPI Window  End

  // KPI Evaluation Start
  {
    element: <KPIEvaluation />,
    path: "/apps/kpi/kpi-evaluation"
  },
  // KPI Evaluation  End

  // Windows Start
  {
    element: <Windows />,
    path: "/apps/kpi/windows"
  },
  {
    element: <WindowOpen />,
    path: "/apps/kpi/windows/windowOpen"
  },
  {
    element: <WindowEdit />,
    path: "/apps/kpi/windows/windowEdit/:id"
  },
  {
    element: <WindowView />,
    path: "/apps/kpi/windows/windowView/:id"
  },
  {
    element: <WindowEmployee />,
    path: "/apps/kpi/windows/WindowEmployee/:id"
  },
  // Windows End

  //Settings Start
  {
    element: <Periods />, //Period page
    path: "/apps/kpi/periods"
  },
  {
    element: <Departments />, //add department to period
    path: "/apps/kpi/periods/departments/:id"
  },
  {
    element: <Preference />, //Preference
    path: "/apps/kpi/master-settings/preference"
  },
  {
    element: <DepartmentSettings />, //DepartmentSettings
    path: "/apps/kpi/master-settings/department-settings"
  },
  {
    element: <Access />, // Access
    path: "/apps/kpi/master-settings/access"
  }
  //Settings End
]

export default KPIRoute
