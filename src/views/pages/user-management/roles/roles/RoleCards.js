// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

// ** Third Party Components
import { Trash2 } from 'react-feather'
import { useForm } from 'react-hook-form'


// ** FAQ Illustrations
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addRoles, deleteRoles, getPermissionList, getRoles } from '../store'
import AddRoleModal from './AddRoleModal'
import EditPermissionModal from './EditPermissionModal'

// ** Vars


const RoleCards = () => {

  const dispatch = useDispatch()
  // ** States
  const [show, setShow] = useState(false)
  const [permissionShow, setPermissionShow] = useState(false)
  const [permissionItem, setPermissionItem] = useState({})
  const [deleteShow, setDeleteShow] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})

  useState(() => {
    dispatch(getRoles())
    dispatch(getPermissionList())
  }, [])

  const store = useSelector(state => state.permissions)

  // ** Hooks
  const {
    reset,
    setValue
  } = useForm()

  const [errors, setErrors] = useState({})

  const onSubmit = data => {
    if (data.roleName.length) {    
      dispatch(addRoles({name:data?.roleName})) 
      setShow(false)
    } else {
      setErrors({roleName: {
        type: 'manual',
        value: 'Please enter a valid role name'
      }})
    }
  }

  const onSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(deleteRoles(deleteItem.id))
    setDeleteShow(!deleteShow)
  }

  const onReset = () => {
    setShow(false)
    reset({ roleName: '' })
  }

  const handleModalClosed = () => {
    setValue('roleName')
  }

  return (
    <Fragment>
      <Row>
        {store.rolesList.map((item) => {
          return (
            <Col key={item.id} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between'>
                    <span>{`Total ${item.totalUsers} users`}</span>
                    {/* <AvatarGroup data={item.users}/> */}
                  </div>
                  <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
                    <div className='role-heading'>
                      <h4 className='fw-bolder'>{item.title}</h4>
                      {store.permission.isEdit && <Link
                        to='/'
                        className='role-edit-modal'
                        onClick={e => {
                          e.preventDefault()
                          setPermissionShow(true)
                          setPermissionItem(item)
                        }}
                      >
                        <small className='fw-bolder'>Edit Permission</small>
                      </Link>
                      }
                    </div>
                    {store.permission.isDelete &&  <Link to='' className='text-body' onClick={(e) => {
                          setDeleteShow(true)
                          setDeleteItem(item)          
                          e.preventDefault()                                   
                        }} >
                        <Trash2 className='font-medium-5' color='red'/>
                      </Link>
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        })}
        {store.permission.isCreate && <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={5}>
                <div className='d-flex align-items-end justify-content-center h-100'>
                  <img className='img-fluid mt-2' src={illustration} alt='Image' width={85} />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className='text-sm-end text-center ps-sm-0'>
                  <Button
                    color='primary'
                    className='text-nowrap mb-1'
                    onClick={() => {
                      setShow(true)
                    }}
                  >
                    Add New Role
                  </Button>
                  <p className='mb-0'>Add a new role, if it does not exist</p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
        }
      </Row>

      {/* delete Modal */}
      <Modal
        isOpen={deleteShow}
        onClosed={handleModalClosed}
        toggle={() => setDeleteShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setDeleteShow(!deleteShow)}></ModalHeader>
        <ModalBody className='px-2 pb-2'>
          <div className='text-center mb-4'>
            <h1>Are you sure to delete '{deleteItem?.title}' Role?</h1>
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

      <AddRoleModal show={show} setShow={setShow} handleModalClosed={handleModalClosed} onSubmit={onSubmit} onReset={onReset} errors={errors}/>
      <EditPermissionModal show={permissionShow} setShow={setPermissionShow} item={permissionItem}/>
    </Fragment>
  )
}

export default RoleCards
