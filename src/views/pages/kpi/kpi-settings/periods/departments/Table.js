// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Label,
  Input,
  Table,
  Button,
  Card
} from 'reactstrap'

// ** Third Party Components
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { getAllDepartment, getPeriodDepartment, updateDepartments } from '../store'
import { useNavigate, useParams } from 'react-router-dom'

const PeriodsDepartmentList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()

  const store = useSelector(state => state.periods)

  // ** Hooks
  const {
  } = useForm({ defaultValues: { roleName: '' } })
  
  const [departments, setDepartments] = useState([])

  const onSubmit = (e) => {
    e.preventDefault() 
    dispatch(updateDepartments({url_id: id, data: departments}))
    navigate('/apps/kpi/periods')
  }


  const checkedOrNot = (id) => {
    const res = departments.find(item => {
      return item?.department_id === id
    })
    return res?.attach
  }

  useEffect(() => {
    const data = []
    if (store.periodDepartment.length > 0) {
      store.departmentList.forEach(val => {        
        data.push({attach: store?.periodDepartment?.some(item => item === val.id), department_id: val.id})
      })
    } else {
      store.departmentList.forEach(val => {        
        data.push({attach: false, department_id: val.id})
      })
    }
    setDepartments(data)
  }, [store.departmentList])

  useEffect(() => {
    dispatch(getAllDepartment())
    dispatch(getPeriodDepartment(id))
  }, [])

  const changePermission =  (id, value) => {
    const res = departments.map(itm => {
      if (itm.department_id === id) {
        return {department_id: id, attach: value}
      } else {
        return itm
      }
    })
    setDepartments(res)
  }

  const checkedAll = (val) => {
    const res = departments.map(itm => {
        return {department_id: itm?.department_id, attach: val}
    })
    setDepartments(res)
  }
  
  return (
    <Fragment>
        <Card className='p-5 pb-5'>
          <div className='text-center'>
            <h1>Set Departments for Monthly Period</h1>
          </div>
          <Row tag='form' onSubmit={onSubmit}>
            <Col xs={12}>
              <Table className='table-flush-spacing' responsive>
                <tbody>
                  <tr>
                    <td>
                      <div className='form-check'>
                        <Input type='checkbox' id='select-all' onChange={(e) => checkedAll(e.target.checked)}/>
                        <Label className='form-check-label' for='select-all'>
                          Select All
                        </Label>
                      </div>
                    </td>
                  </tr>
                  {store.departmentList.map((item, index) => {                               
                    return (
                      <tr key={index}>
                        <td>
                          <div className='d-flex'>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={item?.name} onChange={(e) => changePermission(item?.id, e.target.checked)} checked={checkedOrNot(item?.id)}/>
                              <Label className='form-check-label' for={item?.name}>
                                {item.name}
                              </Label>
                            </div>
                          </div>
                        </td> 
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
            <Col className='text-center mt-2' xs={12}>
              <Button type='submit' color='primary' className='me-1'>
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
    </Fragment>
  )
}

export default PeriodsDepartmentList
