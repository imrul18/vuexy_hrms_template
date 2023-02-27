import { lazy } from "react"

const Notifications = lazy(() => import("./allNotifications"))

const NotificationRoute = [
  {
    element: <Notifications />,
    path: "/apps/notifications"
  }
]

export default NotificationRoute
