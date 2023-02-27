import { Fragment, useEffect, useState } from 'react'
import Repeater from '@components/repeater'
import { X, Plus, Eye } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import Flatpickr from 'react-flatpickr'
import { Row, Col, CardBody, Form, Label, Button, Modal, ModalBody, ModalHeader  } from 'reactstrap'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { addPeriod } from '../store'

const action = (row) => {
  const store = useSelector(state => state.masterSettings)
  const dispatch = useDispatch()
  
  const [open, setOpen] = useState(false)
  const [person, setPerson] = useState(null)
  const [accessList, setAccessList] = useState(null)
  const [data, setData] = useState(null)
  const [periodList, setPeriodList] = useState(null)

  useEffect(() => {
    let val = store.periodOptions    
    data?.map(item => {
      val = val?.filter(itm => itm?.value !== item?.value)
    })
    setPeriodList(val)    
  }, [data])
  
  
  useEffect(() => {
    if (accessList) {
      setData(accessList?.map(item => {
        return {value: item?.period_type_id, label: item?.period?.name, expiration_date:item?.expiration_date}
      }))
    }
  }, [accessList])

  const onChangeDate = (date, i) => {
    const updateData = data?.map((item, index) => {
      if (index === i) {
        return {...item, expiration_date: date[0]}
      } else {
        return item
      }
    })
    setData(updateData)
  }  
  const onChangeAccess = (val, i) => {
    const updateData = data?.map((item, index) => {
      if (index === i) {
        return {...item, ...val}
      } else {
        return item
      }
    })
    setData(updateData)
  }  

  const increaseCount = () => {
    setData([...data, {label: 'Select KPI', value:null, expiration_date: new Date()}])
  }

  const deleteForm = (e, i) => {
    e.preventDefault()
    const x = data?.filter((item, index) => index !== i)
    setData(x)
  }

  const storePermission = (e) => {
    e.preventDefault()
    dispatch(addPeriod({id:person?.id, access:data}))
    setOpen(!open)
  }

  return (
    <>
      <Link className='column-action' onClick={ e => {
        e.preventDefault()
        setOpen(true)
        setPerson(row)
        setAccessList(row?.access)
      }}>        
        <Eye size={18} className={`text-danger me-50`} />   
        
      </Link>

      <Modal
      isOpen={open}
      toggle={() => setOpen(!open)}
      className='modal-dialog-centered modal-lg'>
      <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}></ModalHeader>
      <ModalBody className='px-2 pb-2'>
        <div className='text-center mb-4'>
          <h1>Period Access for {person?.name}</h1>
        </div>


      <Row>
        <Col sm={12}>
        <CardBody>
        <Repeater count={data?.length}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            return (
              <Tag key={i}>
                <Form>
                  <Row className='justify-content-between align-items-center'>
                    <Col md={4} className='mb-md-0 mb-1'>
                      <Label for='role-select'>Period name</Label>                      
                      <Select
                        isClearable={false}
                        value={data.find((item, index) => index === i)}
                        options={periodList}
                        className='react-select'
                        classNamePrefix='select KPI'
                        onChange={data => {
                          onChangeAccess(data, i)              
                        }}
                      />
                    </Col>
                    <Col md={4} className='mb-md-0 mb-1'>
                      <Label className='form-label' for='default-picker'>
                        Expire Date
                      </Label>
                      <Flatpickr className='form-control' value={data[i]?.expiration_date ?? new Date()} onChange={date => onChangeDate(date, i)} id='default-picker' />
                    </Col>                    
                    <Col md={2}>
                      <Button color='danger' className='text-nowrap px-1' onClick={(e) => deleteForm(e, i)} outline>
                        <X size={14} className='me-50' />
                        <span>Delete</span>
                      </Button>
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                </Form>
              </Tag>
            )
          }}
        </Repeater>
        {!data?.length && (
          <div className='text-center mb-4'>
            <h1 className="text-danger">This person has all period's Permission</h1>
          </div>
        )}
        <Button className='btn-icon' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ms-25'>Add New</span>
        </Button>
      </CardBody>
        </Col>
      </Row>


        <Row tag='form' onSubmit={storePermission}>
          <Col className='text-center mt-2' xs={12}>
            <Button type='submit' color='success' className='me-1'>
              Confirm
            </Button>
            <Button type='reset' outline onClick={() => setOpen(!open)}>
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
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'id',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row?.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.name} ({row?.employee_id})</span>
          </Link>
        </div>
      </div>
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
    name: 'Actions',
    minWidth: '100px',
    cell: (row) => action(row)
  }  
]
