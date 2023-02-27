import { Fragment, useEffect, useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap"
import { selectThemeColors } from "@utils"
import Select from "react-select"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllPeriodData, getWindow, startEvaluation } from "../store"
import { useParams } from "react-router-dom"

const index = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.windows)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getWindow(id)) 
    } 
  }, [id])

  useEffect(() => {    
    if (store?.windowData) {
      dispatch(getAllPeriodData(store?.windowData?.period_id))  
    }
  }, [store?.windowData])

  useEffect(() => {    
    if (store?.periodData) {
      setData({...store?.windowData, period: store?.periodData?.name})
    }
  }, [store?.periodData]) 

  const openEvaluation = (e) => {
    setLoading(true)
    e.preventDefault()
    dispatch(startEvaluation(id))  
    setLoading(false)
  }

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Window Details </CardTitle>
                {data?.window_status === 5 && (
                <Button color="danger" onClick={openEvaluation} disabled={loading}>
                  {loading ? <><Spinner className='me-25' size='sm' />Please Wait...</> : 'Start Evaluation'}                  
                </Button>
              )}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="period">
                      Period Type
                    </Label>
                    <Input
                      type="text"
                      name="period"
                      id="period"
                      value={data?.period}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="name">
                      Window Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={data?.name}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="weightage">
                      Weightage
                    </Label>
                    <Input
                      type="text"
                      name="weightage"
                      id="weightage"
                      value={data?.weightage}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="window_start_date">
                      Window Start Date
                    </Label>
                    <Input
                      type="text"
                      name="window_start_date"
                      id="window_start_date"
                      value={data?.window_start_date}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="window_end_date">
                      Window End Date
                    </Label>
                    <Input
                      type="text"
                      name="window_end_date"
                      id="window_end_date"
                      value={data?.window_end_date}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="period_start_date">
                      Period Start Date
                    </Label>
                    <Input
                      type="text"
                      name="period_start_date"
                      id="period_start_date"
                      value={data?.period_start_date}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="period_end_date">
                      Period End Date
                    </Label>
                    <Input
                      type="text"
                      name="period_end_date"
                      id="period_end_date"
                      value={data?.period_end_date}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="evaluation_start_date">
                      Evaluation Start Date
                    </Label>
                    <Input
                      type="text"
                      name="evaluation_start_date"
                      id="evaluation_start_date"
                      value={data?.evaluation_start_date}
                      disabled={true}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="evaluation_end_date">
                      Evaluation End Date
                    </Label>
                    <Input
                      type="text"
                      name="evaluation_end_date"
                      id="evaluation_end_date"
                      value={data?.evaluation_end_date}
                      disabled={true}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>
        <Col md="6" sm="12">
          <Form>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Settings</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="system_hr">
                      Select System HR
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      value={store?.allEmployeeOptions?.find(item => item?.value === data?.system_hr_id)}
                      isDisabled={true}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="final_approver">
                    Select Final Approver
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      value={store?.allEmployeeOptions?.find(item => item?.value === data?.final_approver_id)}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Excludes</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="exclude_dept">
                      Select departments
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      isMulti
                      theme={selectThemeColors}
                      value={store?.departmentOptions?.filter(item => data?.exclude_dept?.includes(item?.value))}
                      isDisabled={true}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="exclude_employee">
                      Select employees
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      isMulti
                      theme={selectThemeColors}
                      value={store?.employeeOptions?.filter(item => data?.exclude_id?.includes(item?.value))}
                      isDisabled={true}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Col>
      </Row>
    </Fragment>
  )
}
export default index
