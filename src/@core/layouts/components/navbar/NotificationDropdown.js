import { Fragment } from "react"
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell } from "react-feather"

import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { Link } from "react-router-dom"
import { readNotifications } from "../../../../redux/globalStore"

const NotificationDropdown = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const store = useSelector((state) => state.global)

  const readNotification = (id) => {
    dispatch(readNotifications({ id, user_id: auth?.userData?.id }))
  }
  const notificationsArray = store?.notifications?.map((item) => {
    return {
      id: item?.id,
      subtitle: item?.subtitle,
      title: <p className="media-heading fw-bolder">{item?.title}</p>,
      datetime: moment(item?.datetime).fromNow(),
      url: item?.url
    }
  })

  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false
        }}
      >
        {notificationsArray?.length ? (
          notificationsArray.map((item, index) => {
            return (
              <div key={index} className="d-flex">
                <Link
                  to={item?.url}
                  onClick={() => readNotification(item?.id)}
                  className={classnames(
                    "list-item d-flex",
                    "align-items-start"
                  )}
                >
                  <Fragment>
                    <div className="list-item-body flex-grow-1">
                      {item.title}
                      <small className="notification-text">
                        {item.subtitle}
                      </small>
                    </div>
                    <small className="notification-text">{item.datetime}</small>
                  </Fragment>
                </Link>
              </div>
            )
          })
        ) : (
          <div className="d-flex">
            <div
              className={classnames("list-item d-flex", "align-items-center")}
            >
              <Fragment>
                <div className="list-item-body flex-grow-1">
                  No unread notification
                </div>
              </Fragment>
            </div>
          </div>
        )}
      </PerfectScrollbar>
    )
  }

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item me-25"
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Bell size={21} />
        {store?.notifications?.length > 0 && 
        <Badge pill color="danger" className="badge-up">
           {store?.notifications?.length}
        </Badge>
        }
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* to active notification*/}
        {/* <li className="dropdown-menu-footer d-flex justify-content-center">
          <Link
            className="btn btn-primary"
            to='/apps/notifications'
            color="primary"
            block
          >
            All notifications
          </Link>
        </li> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
