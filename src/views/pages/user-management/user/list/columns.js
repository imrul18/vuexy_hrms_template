// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteUser, getUser } from '../store'

// ** Icons Imports
import { Archive, Edit, Eye } from 'react-feather'

// ** Reactstrap Imports
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Badge } from 'reactstrap'
import EditSidebar from './EditSidebar'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name }
      />
    )
  }
}

const renderAction = row => {  
  const {permission} = useSelector(state => state.users)

  const [editSidebarOpen, setEditSidebarOpen] = useState(false)
  const toggleEditSidebar = () => setEditSidebarOpen(!editSidebarOpen)

    return (
      <div className='column-action'>
        {permission.isView && <Link className='text-truncate text-capitalize align-middle' to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}>
          <Eye size={18} className={`text-danger me-50`} />
        </Link>
        }
        {permission.isEdit && <Link className='text-truncate text-capitalize align-middle' to='/'
              onClick={(e) => {
                e.preventDefault()
                toggleEditSidebar()
              }}>
          <Edit size={18} className={`text-danger me-50`} />
        </Link>
        }
        {permission.isDelete && <Link className='text-truncate text-capitalize align-middle' to='/'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}>
          <Archive size={18} className={`text-danger me-50`} />
        </Link>
        }
      <EditSidebar user_id={row?.id} open={editSidebarOpen} toggleSidebar={toggleEditSidebar} />
      </div>
    )
}


export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '280px',
    sortField: 'id',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.name}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Employee ID',
    sortable: true,
    minWidth: '100px',
    sortField: 'id',
    selector: row => row.employee_id,
    cell: row => <span className='text-capitalize'>{row.employee_id}</span>
  },
  {
    name: 'Supervisor',
    minWidth: '138px',
    sortable: false,
    sortField: 'Supervisor',
    selector: row => row.supervisor,
    cell: row => (
      <Link
        to={`/apps/user/view/${row.supervisor?.id}`}
        className='user_name text-truncate text-body'
        onClick={() => store.dispatch(getUser(row.supervisor.id))}
      >
        <span className='fw-bolder'>{row.supervisor?.name ?? "--"}</span>
      </Link>
    )
  },
  {
    name: 'Designation',
    minWidth: '138px',
    sortable: false,
    sortField: 'Designation',
    selector: row => row.designation,
    cell: row => <span className='text-capitalize'>{row.designation}</span>
  },
  {
    name: 'department',
    minWidth: '138px',
    sortable: false,
    sortField: 'department',
    selector: row => row.department?.name,
    cell: row => <span className='text-capitalize'>{row.department?.name}</span>
  },
  {
    name: 'Division',
    minWidth: '138px',
    sortable: false,
    sortField: 'Division',
    selector: row => row.department?.division?.name,
    cell: row => <span className='text-capitalize'>{row.department?.division?.name}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: false,
    sortField: 'currentPlan',
    selector: row => row.status,
    cell: row => <span className='text-capitalize'>{row.status ? (<Badge pill color='light-primary' className='me-1'>
    Active
  </Badge>) : (<Badge pill color='light-danger'>
              Inactive
            </Badge>)}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => renderAction(row)
  }
]
