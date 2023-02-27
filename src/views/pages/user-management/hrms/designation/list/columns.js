// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { deleteDesignation, updateDesignation } from '../store'


// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const Action = row => {  
  const dispatch = useDispatch()

  const { permission } = useSelector(state => state.designation)
  // const store = useSelector(state => state.department)


  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  const [editShow, setEditShow] = useState(false)
  const [editItem, setEditItem] = useState({})

  const [editData, setEditData] = useState(null)

  const onSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(deleteDesignation(deleteItem.id))
    setDeleteShow(!deleteShow)
  }

  const onSubmitEdit = (e) => {
    e.preventDefault()
    dispatch(updateDesignation(editData))
    setEditShow(!editShow)
  }  


  useEffect(() => {
    setEditData(editItem)
  }, [editItem])

  const onChangeText = (val, name) => {
    setEditData({...editData, [name]: val})
  }

  // useEffect(() => {
  //   dispatch(getAllEmployee())
  // }, [editItem])
    
  return (
    <div className='column-action px-1'>
      {permission.isEdit && <Link to='' className='text-body' onClick={(e) => {
            setEditShow(true)
            setEditItem(row)          
            e.preventDefault()                                   
          }} >
          <Button color='gradient-secondary mx-1'>Edit</Button>
        </Link>  }
      {permission.isDelete && <Link to='' className='text-body' onClick={(e) => {
            setDeleteShow(true)
            setDeleteItem(row)          
            e.preventDefault()                                   
          }} >
          <Button color='gradient-danger mx-1'>Delete</Button>
        </Link>  
      }

<Modal
        isOpen={editShow}
        toggle={() => setEditShow(!editShow)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setEditShow(!editShow)}></ModalHeader>
        <ModalBody className='px-2 pb-2'>
          <div className='text-center mb-4'>
            <h1>'{editItem?.name}' Department?</h1>
          </div>
          <Row tag='form' onSubmit={onSubmitEdit}>
          <div className='mb-1'>
          <Label className='form-label' for='name'>
            Name <span className='text-danger'>*</span>
          </Label>
          <Input id='name' placeholder='Department Name' onChange={(e) => onChangeText(e?.target.value, 'name')} value={editData?.name}/>
        </div>      
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
              <Input
                type='textarea'
                id='description'
                value={editData?.description}
                onChange={(e) => onChangeText(e?.target.value, 'description')}
              />
        </div>
            
            <Col className='text-center mt-2' xs={12}>
              <Button type='submit' color='danger' className='me-1'>
                Confirm
              </Button>
              <Button type='reset' outline onClick={() => setEditShow(!editShow)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={deleteShow}
        toggle={() => setDeleteShow(!deleteShow)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setDeleteShow(!deleteShow)}></ModalHeader>
        <ModalBody className='px-2 pb-2'>
          <div className='text-center mb-4'>
            <h1>Are you sure to delete '{deleteItem?.name}' Designation?</h1>
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
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'id',
    selector: row => row.name,
    cell: row => <span className='fw-bolder'>{row.name}</span>
  },
  {
    name: 'Total Employees',
    minWidth: '138px',
    sortable: false,
    sortField: 'employee',
    selector: row => row.employees,
    cell: row => (
      <div className='d-flex justify-content-center'>
        <span>{row.employees.length}</span>
      </div>
      )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row) => Action(row)
  }
]