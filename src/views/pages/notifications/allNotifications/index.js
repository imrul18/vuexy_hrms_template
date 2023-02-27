import "@styles/react/apps/app-users.scss"
import moment from "moment"
import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import {
  AllNotifications,
  readNotifications
} from "../../../../redux/globalStore"

const index = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { notifications, allNotifications } = useSelector(
    (state) => state.global
    )

  const readNotification = (id) => {
    dispatch(readNotifications({ id, user_id: auth?.userData?.id }))
  }

  useEffect(() => {
    dispatch(AllNotifications())
  }, [notifications])

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Notifications</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='gy-2'>
            {allNotifications.map(item => (
              <Link to={item?.url} onClick={() => readNotification(item?.id)}>
              <Col sm={12} key={item.key}>
                  <div className={`bg-light-${item?.isRead ? 'secondary' : 'primary'} position-relative rounded p-2`}>
                    <div className='d-flex align-items-center flex-wrap'>
                      <h4 className='mb-1 me-1'>{item?.title}</h4>
                    </div>
                    <h6 className='d-flex align-items-center fw-bolder'>
                      <span className='me-50'>{item?.subtitle}</span>
                    </h6>
                    <span>Created on {moment(item?.datetime).format('Do MMM YYYY, h:mm A')}</span>
                  </div>
              </Col>
              </Link>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default index
