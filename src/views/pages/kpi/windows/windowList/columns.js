import { Code, Edit, Eye, EyeOff, Info, Users } from "react-feather"
import { Link } from "react-router-dom"
import { UncontrolledTooltip } from "reactstrap"

const action = (row) => {
  return (
    <>
      <Link
        className="column-action"
        to={`/apps/kpi/windows/windowView/${row?.id}`}
        id="view"
      >
        <i class="fa fa-balance-scale" aria-hidden="true"></i>
        <Eye size={20} className={`text-danger me-50`} />
        <UncontrolledTooltip placement="top" target="view">
          View
        </UncontrolledTooltip>
      </Link>
      {row?.status_id === 1 && (
        <Link
          className="column-action"
          to={`/apps/kpi/windows/windowEdit/${row?.id}`}
          id="edit"
        >
          <span className={`text-primary me-50`}>
            <Edit size={20} />
            <UncontrolledTooltip placement="top" target="edit">
              Edit
            </UncontrolledTooltip>
          </span>
        </Link>
      )}
      {row?.status_id !== 1 && (
        <Link
          className="column-action"
          to={`/apps/kpi/windows/windowEmployee/${row?.id}`}
          id="employee"
        >
          <Users size={20} className={`text-danger me-50`} />
          <UncontrolledTooltip placement="top" target="employee">
            Employee
          </UncontrolledTooltip>
        </Link>
      )}
    </>
  )
}

export const columns = [
  {
    name: "Window Name",
    sortable: true,
    minWidth: "120px",
    sortField: "name",
    selector: (row) => row.name,
    cell: (row) => <span className="fw-bolder">{row.name}</span>
  },
  {
    name: "Period Type",
    minWidth: "138px",
    sortable: false,
    sortField: "period_type",
    selector: (row) => row.period,
    cell: (row) => <span className="text-capitalize">{row?.period_name}</span>
  },
  {
    name: "Period Start Date",
    minWidth: "138px",
    sortable: false,
    sortField: "period_start_date",
    selector: (row) => row.period_start_date,
    cell: (row) => <span className="text-capitalize">{row?.period_start_date}</span>
  },
  {
    name: "Period End Date",
    minWidth: "138px",
    sortable: false,
    sortField: "period_end_date",
    selector: (row) => row.period_end_date,
    cell: (row) => <span className="text-capitalize">{row?.period_end_date}</span>
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: false,
    sortField: "status",
    selector: (row) => row.status,
    cell: (row) => <span className="text-capitalize">{row.status}</span>
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => action(row)
  }
]
