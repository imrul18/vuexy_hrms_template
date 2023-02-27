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
  Row
} from "reactstrap"
import { selectThemeColors } from "@utils"
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllPeriodData, getWindow, updateWindow } from "../store"
import { useNavigate, useParams } from "react-router-dom"

const index = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector((state) => state.windows)
  const [errors, setErrors] = useState()

  const [data, setData] = useState(null)

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  }

  const onMultiSelectChange = (name, list) => {
    const value = list?.map((item) => {
      return item?.value
    })
    setData({
      ...data,
      [name]: value
    })
  }

  useEffect(() => {    
    if (store?.windowData) {
      dispatch(getAllPeriodData(store?.windowData?.period_id))  
      setData(store?.windowData)
    }
  }, [store?.windowData])

  useEffect(() => {
    if (id) {
      dispatch(getWindow(id))  
    } 
  }, [id])


  const saveWindow = async (val) => {
    const res = await dispatch(
      updateWindow({
        ...data,
        window_status: val
      })
    )
    if (res?.payload?.success) {
      setErrors(null)
      setData(null)
      navigate("/apps/kpi/windows")
    } else {
      setErrors(res?.payload?.error?.errors)
    }
  }

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit {data?.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" >
                    <Label className="form-label" for="nameVertical">
                      Period Type
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="Period"
                      placeholder="Select Period Type"
                      options={store?.periodOptions}
                      value={store?.periodOptions?.find(item => item?.value === data?.period_id)}
                      onChange={(e) => onChange("period_id", e?.value)}
                      isClearable={false}
                      isDisabled={true}
                    />
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="EmailVertical">
                      Window Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Window Name"
                      onChange={(e) => onChange("name", e?.target?.value)}
                      value={data?.name}
                    />
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="EmailVertical">
                      Weightage
                    </Label>
                    <Input
                      type="email"
                      name="Email"
                      id="EmailVertical"
                      value={data?.weightage}
                      placeholder="Email"
                    />
                  </Col>
                  <Col sm="6">
                    {errors?.name && (
                      <p className="text-danger">{errors?.name[0]}</p>
                    )}
                  </Col>
                  <Col sm="6">
                    {errors?.weightage && (
                      <p className="text-danger">{errors?.weightage[0]}</p>
                    )}
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="mobileVertical">
                      Window Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.window_start_date}
                      onChange={(date) => onChange('window_start_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="passwordVertical">
                      Window Start End
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.window_end_date}
                      onChange={(date) => onChange('window_end_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    {errors?.window_start_date && (
                      <p className="text-danger">
                        {errors?.window_start_date[0]}
                      </p>
                    )}
                  </Col>
                  <Col sm="6">
                    {errors?.window_end_date && (
                      <p className="text-danger">
                        {errors?.window_end_date[0]}
                      </p>
                    )}
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="mobileVertical">
                      Period Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.period_start_date}
                      onChange={(date) => onChange('period_start_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="passwordVertical">
                      Period Start End
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.period_end_date}
                      onChange={(date) => onChange('period_end_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    {errors?.period_start_date && (
                      <p className="text-danger">
                        {errors?.period_start_date[0]}
                      </p>
                    )}
                  </Col>
                  <Col sm="6">
                    {errors?.period_end_date && (
                      <p className="text-danger">
                        {errors?.period_end_date[0]}
                      </p>
                    )}
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="mobileVertical">
                      Evaluation Start Start
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.evaluation_start_date}
                      onChange={(date) => onChange('evaluation_start_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6" >
                    <Label className="form-label" for="passwordVertical">
                      Evaluation Start End
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.evaluation_end_date}
                      onChange={(date) => onChange('evaluation_end_date', date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    {errors?.evaluation_start_date && (
                      <p className="text-danger">
                        {errors?.evaluation_start_date[0]}
                      </p>
                    )}
                  </Col>
                  <Col sm="6">
                    {errors?.evaluation_end_date && (
                      <p className="text-danger">
                        {errors?.evaluation_end_date[0]}
                      </p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="mt-1">
                    <div className="d-flex">
                      <Button
                        className="me-1"
                        color="primary"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          saveWindow(2)
                          }
                        }
                      >
                        Publish
                      </Button>
                      <Button outline color="secondary" type="submit" onClick={(e) => {
                          e.preventDefault()
                          saveWindow(1)
                          }
                        }>
                        Save as Draft
                      </Button>
                    </div>
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
                    <Label className="form-label" for="nameVertical">
                      System HR
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      placeholder="Select System HR"
                      options={store?.allEmployeeOptions}
                      value={store?.allEmployeeOptions?.find(
                        (item) => item?.value === data?.system_hr_id
                      )}
                      onChange={(e) => onChange("system_hr_id", e?.value)}
                      isClearable={false}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="nameVertical">
                      Final Approver
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      placeholder="Select Final Approver"
                      options={store?.allEmployeeOptions}
                      value={store?.allEmployeeOptions?.find(
                        (item) => item?.value === data?.final_approver_id
                      )}
                      onChange={(e) => onChange("final_approver_id", e?.value)}
                      isClearable={false}
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
                    <Label className="form-label" for="nameVertical">
                      Select departments
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      isMulti
                      theme={selectThemeColors}
                      placeholder="Select Departments"
                      options={store?.departmentOptions}
                      value={store?.allEmployeeOptions?.find(
                        (item) => data?.exclude_dept?.includes(item?.value)
                      )}
                      onChange={(e) => onMultiSelectChange("exclude_dept", e)}
                      isClearable={false}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="nameVertical">
                      Select employees
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      isMulti
                      theme={selectThemeColors}
                      placeholder="Select Employees"
                      options={store?.employeeOptions}
                      value={store?.allEmployeeOptions?.filter(
                        (item) => data?.exclude_id?.includes(item?.value)
                      )}
                      onChange={(e) => onMultiSelectChange("exclude_id", e)}
                      isClearable={false}
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
