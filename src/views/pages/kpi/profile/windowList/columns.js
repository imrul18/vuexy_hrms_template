import { Edit, Eye, Target } from "react-feather"
import { Link } from "react-router-dom"
import { UncontrolledTooltip } from "reactstrap"

const action = (row) => {
  return (
    <>
    <Link
            className="column-action"
            to={`/apps/kpi/profile/windowView/${row?.window_id}`}
            id={`show_details-${row?.id}`}
          >
            <Eye size={20} className={`text-danger me-50`} />
          </Link>
          <UncontrolledTooltip placement="top" target={`show_details-${row?.id}`}>
            Show Details
          </UncontrolledTooltip>
      {row?.status_id === 1 ? (
        <>        
          <Link
            className="column-action"
            to={`/apps/kpi/goal-set/${row?.window_id}`}
            id={`add_goal-${row?.id}`}
          >
            <Target size={20} className={`text-danger me-50`} />
          </Link>
          <UncontrolledTooltip placement="top" target={`add_goal-${row?.id}`}>
            Goal Set
          </UncontrolledTooltip>
          
        </>
      ) : (
        <>
          {row?.status_id === 6 && (
            <>
              <Link
                className="column-action"
                to={`/apps/kpi/goal-set/${row?.window_id}`}
                id="sel-evaluation"
              >
                <Edit size={20} className={`text-danger me-50`} />
              </Link>
              <UncontrolledTooltip placement="top" target="sel-evaluation">
                Self Evaluation
              </UncontrolledTooltip>
            </>
          )}
          <Link
            className="column-action"
            to={`/apps/kpi/goal-preview/${row?.window_employee_id}`}
            id="goal-preview"
          >
            <Eye size={20} className={`text-danger me-50`} />
          </Link>
          <UncontrolledTooltip placement="top" target="goal-preview">
            Preview Goals
          </UncontrolledTooltip>
        </>
      )}
    </>
  )
}

export const columns = [
  {
    name: "Window Name",
    sortable: true,
    minWidth: "300px",
    sortField: "name",
    selector: (row) => row.name,
    cell: (row) => <span className="fw-bolder">{row.name}</span>
  },
  {
    name: "Period Type",
    minWidth: "138px",
    sortable: false,
    sortField: "period_type",
    selector: (row) => row.period_name,
    cell: (row) => <span className="text-capitalize">{row?.period_name}</span>
  },
  {
    name: "Grade",
    minWidth: "138px",
    sortable: false,
    sortField: "period_type",
    selector: (row) => row.period_name,
    cell: (row) => (
      <span className="text-capitalize">
        {row?.grade}/{row?.weightage}
      </span>
    )
  },
  {
    name: "Period Start Date",
    minWidth: "138px",
    sortable: false,
    sortField: "period_start_date",
    selector: (row) => row.period_start_date,
    cell: (row) => (
      <span className="text-capitalize">{row?.period_start_date}</span>
    )
  },
  {
    name: "Period End Date",
    minWidth: "138px",
    sortable: false,
    sortField: "period_end_date",
    selector: (row) => row.period_end_date,
    cell: (row) => (
      <span className="text-capitalize">{row?.period_end_date}</span>
    )
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: false,
    sortField: "status",
    selector: (row) => row.department?.name,
    cell: (row) => <span className="text-capitalize">{row.status}</span>
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => action(row)
  }
]
