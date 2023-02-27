
import { useState } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'
import EditData from './EditData'


// ** Icons Imports
import { Archive, Edit, Eye } from 'react-feather'

// ** Reactstrap Imports
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Modal, ModalBody, ModalHeader, Row, Badge } from 'reactstrap'
import { deletePeriod } from '../store'

const renderStatus = row => {  
    return (
      <span className='text-capitalize'>
        {row.status ? <Badge pill color='light-primary' className='me-1'>Active</Badge> : <Badge pill color='light-danger'>Active</Badge>
        }
      </span>
    )
}

const renderAction = (row) => {  
  const dispatch = useDispatch()
  const {permission} = useSelector(state => state.periods)

  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  const [editData, setEditData] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const onSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(deletePeriod(deleteItem.id))
    setDeleteShow(!deleteShow)
  }

    return (
      <div className='column-action'>
        {permission.isEdit && <Link className='text-truncate text-capitalize align-middle'
        onClick={e => {
          e.preventDefault()
          setEditData(row)
          toggleSidebar()
        }}>
          <Edit size={18} className={`text-danger me-50`} />
        </Link>
        }
        {permission.isDelete && row?.is_management !== 1 && <Link className='text-truncate text-capitalize align-middle'
              onClick={(e) => {
                e.preventDefault()
                setDeleteShow(true)
                setDeleteItem(row) 
              }}>
          <Archive size={18} className={`text-danger me-50`} />
        </Link>
        }

      <EditData open={sidebarOpen} toggleSidebar={toggleSidebar} editData={editData}/>


        <Modal
          isOpen={deleteShow}
          toggle={() => setDeleteShow(!deleteShow)}
          className='modal-dialog-centered modal-lg'
        >
          <ModalHeader className='bg-transparent' toggle={() => setDeleteShow(!deleteShow)}></ModalHeader>
          <ModalBody className='px-2 pb-2'>
            <div className='text-center mb-4'>
              <h1>Are you sure to delete '{deleteItem?.name}' Period?</h1>
            </div>
            <Row tag='form' onSubmit={onSubmitDelete}>
              <Col className='text-center mt-2' xs={12}>
                <Button type='submit' color='danger' className='me-1'>
                  Confirm
                </Button>
                <Button type='reset' outline onClick={() => setDeleteShow(!deleteShow)}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
}

export const columns = [
  {
    name: 'Period Name',
    sortable: false,
    minWidth: '300px',
    sortField: 'periodName',
    selector: row => row?.name,
    cell: row => (row?.is_management === 1 ? <span className='fw-bolder text-truncate text-body'>{row?.name}</span> : <Link className='fw-bolder text-truncate text-body' to={`/apps/kpi/periods/departments/${row?.id}`}>{row?.name}</Link>)
  },
  {
    name: 'Duration',
    sortable: false,
    minWidth: '172px',
    sortField: 'duration',
    selector: row => row?.duration,
    cell: row => (<span>{row?.duration}</span>)
  },
  {
    name: 'Weightage',
    minWidth: '172px',
    sortable: false,
    sortField: 'weightage',
    selector: row => row?.weightage,
    cell: row => (<span>{row?.weightage}</span>)
  },
  {
    name: 'Minimum Goals',
    minWidth: '172px',
    sortable: false,
    sortField: 'minimumGoal',
    selector: row => row?.min_goal,
    cell: row => (<span>{row?.min_goal}</span>)
  },
  {
    name: 'Maximum Goals',
    minWidth: '172px',
    sortable: false,
    sortField: 'maximumGoal',
    selector: row => row?.max_goal,
    cell: row => <span className='text-capitalize'>{row?.max_goal}</span>
  },
  {
    name: 'Status',
    minWidth: '172px',
    sortable: false,
    sortField: 'status',
    selector: row => row.status,
    cell: row => renderStatus(row)
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row) => renderAction(row)
  }
]
