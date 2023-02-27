// ** React Imports
import { useState } from 'react'
import { Eye, Target, Trash, Trash2 } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Modal, ModalBody, ModalHeader, Row, UncontrolledTooltip } from 'reactstrap'
import { removeWindowEmployee } from '../store'

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser } from '../store'

const action = (row) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  const onSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(removeWindowEmployee({window_employee_id: deleteItem.id, id}))
    setDeleteShow(!deleteShow)
  }
  return (
    <>
      {/* <Link className='column-action' to={`/apps/kpi/windows/windowView/${row?.id}`} id={`view${row?.id}`}>
        <Eye size={20} className={`text-danger me-50`} />   
      </Link> */}
      <Link className='column-action' to={`/apps/kpi/goal-preview/${row?.id}`} id={`goal${row?.id}`}>
          <Target  size={20} className={`text-danger me-50`} />           
      </Link>
      {row?.kpi_status_id !== 9 && <><Link className='column-action' onClick={(e) => {
            setDeleteShow(true)
            setDeleteItem(row)          
            e.preventDefault()                                
          }} id={`delete${row?.id}`}>
          <Trash2  size={20} className={`text-danger me-50`} />
      </Link>
      <UncontrolledTooltip placement='top' target={`delete${row?.id}`}>
      Remove Employee
    </UncontrolledTooltip></>
    }
      
      {/* <UncontrolledTooltip placement='top' target={`view${row?.id}`}>
        View Details
      </UncontrolledTooltip> */}
      
      <UncontrolledTooltip placement='top' target={`goal${row?.id}`}>
        Show Goals
      </UncontrolledTooltip>

      <Modal
        isOpen={deleteShow}
        toggle={() => setDeleteShow(!deleteShow)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setDeleteShow(!deleteShow)}></ModalHeader>
        <ModalBody className='px-2 pb-2'>
          <div className='text-center mb-4'>
            <h1>Are you sure to Remove '{deleteItem?.name}' from the window?</h1>
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
      
  </>
  )
}

export const columns = [
  {
    name: 'KPI status',
    sortable: true,
    minWidth: '120px',
    sortField: 'kpi_status',
    selector: row => row.kpi_status,
    cell: row => (<span className='fw-bolder'>{row.kpi_status}</span>)
  },
  {
    name: 'Name',
    sortable: false,
    minWidth: '180px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className='fw-bolder'>{row?.name} ({row?.employee_id})</span>
  },
  {
    name: 'Grade',
    minWidth: '50px',
    sortable: false,
    sortField: 'grade',
    selector: row => row.grade,
    cell: row => <span className='text-capitalize'>{row?.grade}/{row?.weightage}</span>
  },  
  {
    name: 'Division',
    minWidth: '120px',
    sortable: false,
    sortField: 'Supervisor',
    selector: row => row.division,
    cell: row => (<span className='fw-bolder'>{row?.division}</span>)
  },
  {
    name: 'Department',
    minWidth: '120px',
    sortable: false,
    sortField: 'department',
    selector: row => row.department,
    cell: row => <span className='text-capitalize'>{row?.department}</span>
  },
  {
    name: 'Phone',
    minWidth: '120px',
    sortable: false,
    sortField: 'phone',
    selector: row => row.phone,
    cell: row => <span className='text-capitalize'>{row?.phone}</span>
  },
  {
    name: 'Email',
    minWidth: '200px',
    sortable: false,
    sortField: 'email',
    selector: row => row.email,
    cell: row => <span>{row?.email}</span>
  }, 
  {
    name: 'Actions',
    minWidth: '50px',
    cell: (row) => action(row)
  } 
]
