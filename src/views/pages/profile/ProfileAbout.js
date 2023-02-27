import { Card, CardBody, CardText} from "reactstrap"

const ProfileAbout = ({ data }) => {
  return (
        <Card>
        <CardBody>
        <h5 className="mb-75 mt-75">Name</h5>
        <CardText>{data?.name}</CardText>
        <div className="mt-2">
          <h5 className="mb-75">Employee ID</h5>
          <CardText>{data?.employee_id}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Email</h5>
          <CardText>{data?.email}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Phone</h5>
          <CardText>{data?.phone}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Supervisor</h5>
          <CardText>{data?.supervisor}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Division</h5>
          <CardText>{data?.division}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Department</h5>
          <CardText>{data?.department}</CardText>
        </div>        
        <div className="mt-2">
          <h5 className="mb-75">Designation</h5>
          <CardText>{data?.designation}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Status</h5>
          <CardText>{data?.status ? 'Active' : 'Inactive'}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
