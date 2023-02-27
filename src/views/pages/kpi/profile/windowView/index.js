import { Fragment, useEffect, useState } from "react"
import {
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
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { useDispatch, useSelector } from "react-redux"
import {  getWindow } from "../store"
import { useParams } from "react-router-dom"

const index = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.kpiProfile)

  const [data, setData] = useState(null)

  useEffect(() => {
    if (id) {
      dispatch(getWindow(id)) 
    } 
  }, [id])

  useEffect(() => {    
    if (store?.windowData) {
      setData(store?.windowData)
    }
  }, [store?.windowData]) 


  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Window Details </CardTitle>                
              </CardHeader>
              <CardBody>
                <Row>
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
        </Col>
      </Row>
    </Fragment>
  )
}
export default index
