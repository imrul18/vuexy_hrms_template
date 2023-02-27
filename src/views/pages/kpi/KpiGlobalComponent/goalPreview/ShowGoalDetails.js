import { Fragment } from "react"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { Label, Row, Col, Input, Form } from "reactstrap"
import moment from "moment"

const ShowGoalDetails = ({ goal, isComment, setGoal, isRating }) => {
  const onChange = (e, index) => {
    const selectedGoal = [...goal]
    selectedGoal[index] = {
      ...selectedGoal[index],
      [e.target?.name]: e.target?.value
    }
    setGoal(selectedGoal)
  }
  return (
    <Fragment>
      {goal?.map((item, index) => (
        <span className="mb-1">
          <div className="content-header">
            <h5 className="mb-0">Goal-{index + 1}</h5>
          </div>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="justify-content-between align-items-center">
              <Col md={12} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-item-name-meets-${item?.goal_name}`}
                >
                  Name
                </Label>
                <Input
                  type="text"
                  name="goal_name"
                  id="exampleText"
                  placeholder="Goal Meets"
                  value={item?.goal_name}
                  disabled
                />
              </Col>
              <Col md={6} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-item-name-meets-${item?.goal_name}`}
                >
                  Goal Meets
                </Label>
                <Input
                  type="textarea"
                  name="goal_meet"
                  id="exampleText"
                  rows="3"
                  placeholder="Goal Meets"
                  value={item?.goal_meet}
                  disabled
                />
              </Col>
              <Col md={6} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-item-name-exceeds-${item?.goal_name}`}
                >
                  Goal Exceeds
                </Label>
                <Input
                  type="textarea"
                  name="goal_exceed"
                  id="exampleText"
                  rows="3"
                  placeholder="Goal Exceeds"
                  value={item?.goal_exceed}
                  disabled
                />
              </Col>

              <Col md={4} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-start_date-${item?.goal_name}`}
                >
                  Start Date
                </Label>
                <Input
                  className="form-control"
                  id={`animation-start_date-${item?.goal_name}`}
                  value={item?.start_date}
                  disabled
                />
              </Col>
              <Col md={4} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-end_date-${item?.goal_name}`}
                >
                  End Date
                </Label>
                <Input
                  className="form-control"
                  id={`animation-end_date-${item?.goal_name}`}
                  value={item?.end_date}
                  disabled
                />
              </Col>
              <Col md={4} className="mb-md-0 mb-1">
                <Label
                  className="form-label"
                  for={`animation-weight-${item?.goal_name}`}
                >
                  Weightage
                </Label>
                <Input
                  type="number"
                  name="weight"
                  id={`animation-weight-${item?.goal_name}`}
                  value={item?.weight}
                  disabled
                />
              </Col>
              {item?.goal_comments?.lenth && (
                <div className="content-header">
                  <h5 className="mt-1">Goal Approval Comment</h5>
                </div>
              )}
              {item?.goal_comments?.map((comment) => (
                <span>
                  <Col md={12}>
                    <Label
                      className="form-label"
                      for={`animation-weight-${comment?.id}`}
                    >
                      Comment by {comment?.user?.name} at{" "}
                      {moment(comment?.created_at).format("h:mm a, D-MMM-YYYY")}
                    </Label>
                    <Input
                      type="textarea"
                      name="weight"
                      id={`animation-weight-${comment?.comment}`}
                      value={comment?.comment}
                      disabled
                    />
                  </Col>
                </span>
              ))}
              {(item?.final_score || isRating) && (
                <span>
                  <div className="content-header">
                    <h5 className="mt-1">Evaluation Remark</h5>
                  </div>
                  <Row className="justify-content-between align-items-center">
                    <Col md={8} className="mb-md-0 mb-1">
                      <Label
                        className="form-label"
                        for={`animation-start_date-${item?.goal_name}`}
                      >
                        Remarks
                      </Label>
                      <Input
                        type="textarea"
                        rows={5}
                        className="form-control"
                        name="final_remarks"
                        id={`animation-start_date-${item?.grade_remarks}`}
                        value={item?.final_remarks}
                        onChange={(e) => onChange(e, index)}
                        disabled={!isRating}
                      />
                    </Col>
                    <Col md={4} className="mb-md-0 mb-1">
                      <Label
                        className="form-label"
                        for={`animation-weight-${item?.goal_name}`}
                      >
                        Rating
                      </Label>
                      <Input
                        type="number"
                        name="final_score"
                        id={`animation-start_date-${item?.final_score}`}
                        value={item?.final_score}
                        onChange={(e) => onChange(e, index)}
                        disabled={!isRating}
                      />
                    </Col>
                  </Row>
                </span>
              )}

              {isComment && (
                <Col md={12} className="mb-md-0 mb-1">
                  <Label
                    className="form-label"
                    for={`animation-weight-${item?.goal_name}`}
                  >
                    Comment
                  </Label>
                  <Input
                    type="textarea"
                    name="supervisor_comment"
                    id="exampleText"
                    rows="3"
                    placeholder="Goal Comment"
                    value={item?.supervisor_comment}
                    onChange={(e) => onChange(e, index)}
                  />
                </Col>
              )}
            </Row>
          </Form>
          <hr />
        </span>
      ))}
    </Fragment>
  )
}

export default ShowGoalDetails
