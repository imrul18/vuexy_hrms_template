import { Edit, Eye, Info } from "react-feather"
import { Link } from "react-router-dom"

const windowStatus = (id) => {
  switch (id) {
    case 4:
      return <span>Waiting for your Approval</span>
    case 6:
      return <span>Approved</span>
    default:
      return <span>Not yet requested</span>
  }
}

const action = (row) => {
  return (
    <Link
      className="column-action"
      to={`/apps/kpi/window-employee-goal/${row?.window_employee_id}`}
      id="view"
    >
      <Eye size={20} className={`text-danger me-50`} />
    </Link>
  )
}

export const columns = [
  {
    name: "Window Name",
    sortable: true,
    minWidth: "300px",
    sortField: "name",
    selector: (row) => row.name,
    cell: (row) => <span className="fw-bolder">{row.window_name}</span>
  },
  {
    name: "Employee Name",
    minWidth: "150px",
    sortable: false,
    sortField: "employee_name",
    selector: (row) => row.period_name,
    cell: (row) => <span className="text-capitalize">{row?.employee_name} ({row?.employee_id})</span>
  },
  {
    name: "Email",
    minWidth: "138px",
    sortable: false,
    sortField: "employee_email",
    selector: (row) => row.employee_email,
    cell: (row) => <span>{row?.employee_email}</span>
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: false,
    sortField: "status",
    selector: (row) => row.approval_status,
    cell: (row) => windowStatus(row?.approval_status)
  },
  {
    name: "Action",
    minWidth: "100px",
    sortable: false,
    sortField: "action",
    selector: (row) => row,
    cell: (row) => action(row)
  }
]
