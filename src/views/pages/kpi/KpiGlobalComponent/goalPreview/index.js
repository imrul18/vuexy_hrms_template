import { useState, Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input
} from "reactstrap"
import Avatar from '@components/avatar'

import { evaluationAction, getGoalPreview, windowAction } from "../store"

import ShowGoalDetails from "./ShowGoalDetails"

import { Check, Pause, PenTool, RefreshCw, X } from "react-feather"
import ApprovalDetails from "./ApprovalDetails"
import Select from "react-select"
import moment from "moment"

const index = () => {
  const [approvalData, setApprovalData] = useState(null)
  const [evaluationData, setEvaluationData] = useState(null)

  const dispatch = useDispatch()
  const { employee_window_id } = useParams()
  const store = useSelector((state) => state.kpiWindow)

  const [goal, setGoal] = useState([])
  const [windowId, setWindowId] = useState(null)

  const iconSelect = (id) => {
    switch (id) {
      case 1:
        return <PenTool size={14} />
      case 2:
        return <PenTool size={14} />
      case 3:
        return <Check size={14} />
      case 4:
        return <Spinner type="grow" color="success" />
      case 5:
        return <Pause size={14} />
      case 6:
        return <Check size={14} />
      case 7:
        return <RefreshCw size={14} />
      default:
        return <Check size={14} />
    }
  }

  const colorSelect = (id) => {
    switch (id) {
      case 1:
        return "success"
      case 2:
        return "success"
      case 3:
        return "secondary"
      case 4:
        return "success"
      case 5:
        return "danger"
      case 6:
        return "success"
      case 7:
        return "danger"
      default:
        return "secondary"
    }
  }

  useEffect(() => {
    if (store?.goalPreviewData) {
      const data = store?.goalPreviewData?.approvalProcess?.map((item) => {
        return {
          title: `${item?.employee_name} ${item?.approval_status}`,
          icon: iconSelect(item?.approval_status_id),
          color: colorSelect(item?.approval_status_id),
          customContent: (
            <span>
            <div className="d-flex align-items-center mb-1">
                  
                <Avatar img={item?.employee?.avatar_url} imgHeight="38" imgWidth="38" />
                <div className="ms-50">
                  <h6 className="mb-0">{item?.employee?.name}</h6>
                  <span>{item?.employee?.designation?.name}</span>
                </div>
              </div>
              {item?.comments?.map(commnet => (
                <>
                <div className="mb-0">{commnet?.comment_status} at {moment(commnet?.date).format('h:mma')} {moment(commnet?.date).format('ll')}</div>
                <div className="mb-1">Comment: {commnet?.comment}</div>
                </>
              ))}
              </span>
          )
        }
      })
      setApprovalData(data)
      const evaluation = store?.goalPreviewData?.evaluationProcess?.map(
        (item) => {
          return {
            title: `${item?.employee_name} ${item?.evaluation_status}`,
            icon: iconSelect(item?.evaluation_status_id),
            color: colorSelect(item?.evaluation_status_id),
            customContent: (
              <span>
              <div className="d-flex align-items-center mb-1">
                    
                  <Avatar img={item?.employee?.avatar_url} imgHeight="38" imgWidth="38" />
                  <div className="ms-50">
                    <h6 className="mb-0">{item?.employee?.name}</h6>
                    <span>{item?.employee?.designation?.name}</span>
                  </div>
                </div>
                {item?.comments?.map(commnet => (
                  <>
                  <div className="mb-0">{commnet?.comment_status} at {moment(commnet?.date).format('h:mma')} {moment(commnet?.date).format('ll')}</div>
                  <div className="mb-1">Comment: {commnet?.comment}</div>
                  </>
                ))}
                </span>
            )
          }
        }
      )
      setEvaluationData(evaluation)
      setWindowId(store?.goalPreviewData?.window_id)
    }
  }, [store?.goalPreviewData])

  useEffect(() => {
    dispatch(getGoalPreview(employee_window_id))
  }, [employee_window_id])

  const [actionModal, setActionModal] = useState(false)
  const [actionData, setActionData] = useState(null)
  const [errors, setErrors] = useState()

  useEffect(() => {
    if (store?.goalPreviewData) {
      setGoal(store?.goalPreviewData?.goals)
      setActionData({
        window_process_id: store?.goalPreviewData?.window_process_id,
        employee_window_id
      })
    }
  }, [store?.goalPreviewData])

  const onActionChange = (name, value) => {
    setActionData({ ...actionData, [name]: value })
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    const data = {
      id : employee_window_id,
      data : { ...actionData, goal }
    }
    const res =  store?.goalPreviewData?.actionOn === "goalApproval" ? await dispatch(windowAction(data)) : await dispatch(evaluationAction(data))
    if (res?.payload?.success) {
      setActionModal(false)
      setErrors(null)
    } else {
      setErrors(res?.payload?.error?.errors)
    }
  }

  const takeAction = () => {
    return (
      <Modal
        isOpen={actionModal}
        toggle={() => setActionModal(!actionModal)}
        className="modal-dialog-centered"
        onClosed={() => setActionModal(false)}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setActionModal(!actionModal)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">Take Action</h1>
          <Row tag="form" className="gy-1 gx-2 mt-75" onSubmit={onSubmit}>
            <Col className="mt-1" xs={12}>
              <Label className="form-label" for="card-name">
                Action
              </Label>
              <Select
                options={store?.goalPreviewData?.takeAction}
                onChange={(e) => onActionChange("action_status", e.value)}
              />
              {errors?.action_status && (
                <p className="text-danger">
                  {errors?.action_status}
                </p>
              )}
              <Label className="form-label" for="card-name">
                Approval Comment
              </Label>
              <Input
                type="textarea"
                id="card-name"
                onChange={(e) => onActionChange("comment", e.target.value)}
              />
              {errors?.comment && (
                <p className="text-danger">
                  {errors?.comment}
                </p>
              )}
            </Col>          

            <Col className="text-center mt-1" xs={12}>
              <Button type="submit" className="me-1" color="primary">
                Submit
              </Button>
              <Button
                color="secondary"
                outline
                onClick={() => {
                  setActionModal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <Fragment>
      <Row className="justify-content-between">
        <Col md={8} className="mb-md-0 mb-1">
          <Card>
            <CardHeader className="d-flex justify-content-between">
              <h4 className="card-title">Goal Details</h4>
              {(store?.goalPreviewData?.window_process_type === "isAction" ||
                store?.goalPreviewData?.window_process_type === "isRating" ||
                store?.goalPreviewData?.window_process_type ===
                  "isComment") ? (
                <Button color="danger" onClick={() => setActionModal(true)}>
                  Take Action
                </Button>
              ) : store?.goalPreviewData?.window_process_type === "isEdit" &&
                windowId && (
                  <Link
                    className="column-action"
                    to={`/apps/kpi/goal-set/${windowId}`}
                    id="goal-preview"
                  >
                    <Button color="danger">Edit Goal</Button>
                  </Link>
                )
              }
              <div></div>              
            </CardHeader>
            <CardBody>
              <ShowGoalDetails
                goal={goal}
                setGoal={setGoal}
                isComment={
                  store?.goalPreviewData?.window_process_type === "isComment"
                }
                isRating={
                  store?.goalPreviewData?.window_process_type === "isRating"
                }
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={4} className="mb-md-0 mb-1">
          <Card>
            <CardHeader>
              <h4 className="card-title">Goal Approval Process</h4>
            </CardHeader>
            <CardBody>
              <ApprovalDetails data={approvalData} />
            </CardBody>
          </Card>
          {evaluationData?.length > 0 && (
            <Card>
              <CardHeader>
                <h4 className="card-title">Evaluation Approval Process</h4>
              </CardHeader>
              <CardBody>
                <ApprovalDetails data={evaluationData} />
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      {takeAction()}
    </Fragment>
  )
}
export default index
