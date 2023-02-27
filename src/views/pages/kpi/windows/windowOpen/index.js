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
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import _ from "lodash"
import moment from "moment"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useDispatch, useSelector } from "react-redux"
import { addWindow, getAllPeriodData, getPeriod } from "../store"
import { useNavigate } from "react-router-dom"
import makeAnimated from "react-select/animated"

const index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const animatedComponents = makeAnimated()
  const store = useSelector((state) => state.windows)

  const [data, setData] = useState(null)
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)

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
    if (store?.periodData?.id) {
      const periodType = store?.periodData
      const duration = periodType?.duration ?? 1

      const months = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], duration)
      let year = parseInt(moment().format("Y"))
      const curMonth = parseInt(moment().format("M"))
      let index = 0

      for (let i = 0; i < months.length; i++) {
        if (months[i].includes(curMonth)) {
          index = i + 1
          if (index === months.length) {
            index = 0
            year += 1
          }
          break
        }
      }
      const period = months[index]

      const startDate = moment()
        .month(period[0] - 1)
        .year(year)
        .startOf("month")

      const endDate = moment()
        .month(period[period.length - 1] - 1)
        .year(year)
        .endOf("month")

      const typeDate = duration === 1 ? endDate.format("MMM-YYYY") : `${startDate.format("MMM-YYYY")}-${endDate.format("MMM-YYYY")}`

      if (store?.periodData) {
        setData({
          ...data,
          name: typeDate,
          weightage: periodType?.weightage,
          min_goal: periodType?.min_goal,
          max_goal: periodType?.max_goal,
          period_start_date: moment(startDate).format("YYYY-MM-DD"),
          period_end_date: moment(endDate).format("YYYY-MM-DD"),
          window_end_date: moment(startDate.subtract(1, "days")).format(
            "YYYY-MM-DD"
          ),
          window_start_date: moment(startDate.subtract(9, "days")).format(
            "YYYY-MM-DD"
          ),
          evaluation_start_date: moment(endDate.add(1, "days")).format(
            "YYYY-MM-DD"
          ),
          evaluation_end_date: moment(endDate.add(9, "days")).format(
            "YYYY-MM-DD"
          ),
          system_hr_id: store?.periodData?.system_hr_id,
          final_approver_id: store?.periodData?.final_approver_id,
          is_management: store?.periodData?.is_management,
          hierarchy_level: store?.periodData?.hierarchy_level
        })
      }
    } else {
      setData(null)
    }
  }, [store?.periodData])

  useEffect(() => {
    dispatch(getPeriod())
  }, [])

  useEffect(() => {
    if (data?.period_id) {
      dispatch(getAllPeriodData(data?.period_id))
    }
  }, [data?.period_id])

  const saveWindow = async (val) => {
    setLoading(true)
    const res = await dispatch(
      addWindow({
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
    setLoading(false)
  }

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New Window</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Label className="form-label" for="nameVertical">
                      Period Type
                    </Label>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="Period"
                      placeholder="Select Period Type"
                      options={store?.periodOptions}
                      onChange={(e) => onChange("period_id", e?.value)}
                      isClearable={false}
                    />
                  </Col>
                  <Col sm="12">
                    {errors?.period_id && (
                      <p className="text-danger">{errors?.period_id[0]}</p>
                    )}
                  </Col>
                  <Col sm="6">
                    <Label className="form-label" for="name">
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
                  <Col sm="6">
                    <Label className="form-label" for="weightage">
                      Weightage
                    </Label>
                    <Input
                      type="text"
                      name="weightage"
                      id="weightage"
                      value={data?.weightage}
                      placeholder="Weightage"
                      onChange={(e) => onChange(e.target.name, e.target.value)}
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
                  <Col sm="6">
                    <Label className="form-label" for="mobileVertical">
                      Window Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.window_start_date}
                      onChange={(date) =>  onChange("window_start_date", date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    <Label className="form-label" for="passwordVertical">
                      Window Start End
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.window_end_date}
                      onChange={(date) => onChange("window_end_date", date[0])}
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
                  <Col sm="6">
                    <Label className="form-label" for="mobileVertical">
                      Period Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.period_start_date}
                      onChange={(date) => onChange("period_start_date", date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    <Label className="form-label" for="passwordVertical">
                      Period End Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.period_end_date}
                      onChange={(date) => onChange("period_end_date", date[0])}
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
                  <Col sm="6">
                    <Label className="form-label" for="mobileVertical">
                      Evaluation Start Start
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.evaluation_start_date}
                      onChange={(date) => onChange("evaluation_start_date", date[0])}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="6">
                    <Label className="form-label" for="passwordVertical">
                      Evaluation Start End
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={data?.evaluation_end_date}
                      onChange={(date) => onChange("evaluation_end_date", date[0])}
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
                        }}
                        disabled={loading}
                      >
                        {loading ? <><Spinner className='me-25' size='sm' />Please Wait...</> : 'Publish'}
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          saveWindow(1)
                        }}
                        disabled={loading}
                      >
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
                      isClearable={false}
                      theme={selectThemeColors}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={store?.departmentOptions}
                      onChange={(e) => onMultiSelectChange("exclude_dept", e)}
                      className="react-select"
                      classNamePrefix="select"
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="nameVertical">
                      Select employees
                    </Label>
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={store?.employeeOptions}
                      onChange={(e) => onMultiSelectChange("exclude_id", e)}
                      className="react-select"
                      classNamePrefix="select"
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
