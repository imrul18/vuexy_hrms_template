// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardBody, Col, Input, Form, Button, Label, Row } from 'reactstrap'
import Select from 'react-select'
import Instructions from '@src/views/components/instractions'

import { getAllDepartmentSettings, getAllEmployee, setAllDepartmentSettings } from '../store'

const DepartmentSettings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmployee())
    dispatch(getAllDepartmentSettings())
  }, [])

  const [data, setData] = useState([])
  const {employeesOptions, departmentSettings} = useSelector(state => state.masterSettings)


  useEffect(() => {
    setData(departmentSettings)
  }, [departmentSettings])

  const onChangeCheck = (e) => {
    const newData = data.map(item => {
      const tag = e.name
      if (item?.department_id === e?.department_id) {
        return {...item, [tag]:e.value}
      } else {
        return item
      }
    })
    setData(newData)  
  }

  const onSubmit = (e) => {   
    e.preventDefault()
    dispatch(setAllDepartmentSettings(data))
  }
  
  return (
 
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Departments Settings</CardTitle>
          </CardHeader>

          <CardBody>
          <Instructions name='department_settings'/>  
            <Form>
            {data.map(item => {                      
              return (
                <div className='border p-1 m-1'>
                  <Row className='align-items-center mb-1'>                    
                    <Col sm='2'>
                      <CardHeader>
                        <CardTitle tag='h3'>{item.name}</CardTitle>
                      </CardHeader>
                    </Col>
                    <Col sm='2' className='align-items-end'>
                      Hierarchy Level:
                    </Col>
                    <Col sm='1'>
                      <Input type='text' 
                        name='hierarchy_level' 
                        id='hierarchy_level' 
                        value={item?.hierarchy_level}
                        onChange={(e) => {  
                          onChangeCheck({
                              value: e.target.value, 
                              name:'hierarchy_level', 
                              department_id:item.department_id
                          })              
                        }}
                      />
                    </Col>
                    {item?.include_special_person && 
                    <>
                      <Col sm='2' className='d-flex align-items-end'>
                          Special Person:
                      </Col>
                      <Col sm='3'>
                        <Select
                            isClearable={false}
                            defaultValue={item?.special_person}
                            options={employeesOptions}
                            className='react-select'
                            classNamePrefix='select-hr'
                            id='include_special_person_id'
                            onChange={(data) => {   
                              onChangeCheck({
                                  value: data.value, 
                                  name:'include_special_access_id', 
                                  department_id:item.department_id
                              })              
                            }}
                          />
                      </Col>
                    </>}    
                  </Row> 

                  <Row className='justify-content-between align-items-center mb-1'>                   
                    <Col sm='2'>
                      <div className='form-check'>
                        <Input type='checkbox' id='include_special_person' checked={item?.include_special_person} onChange={() => {
                            onChangeCheck({
                              value:!item?.include_special_person, 
                              name:'include_special_person', 
                              department_id:item.department_id
                            })
                          }}
                        />
                        <Label for='include_department_head'>Include Special Person</Label>
                      </div>
                    </Col>
                    <Col sm='2'>
                      <div className='form-check'>
                        <Input type='checkbox' id='include_department_head' checked={item?.include_department_head} onChange={() => {
                            onChangeCheck({
                              value:!item?.include_department_head, 
                              name:'include_department_head', 
                              department_id:item.department_id
                            })
                          }}
                        />
                        <Label for='include_department_head'>Include Department Head</Label>
                      </div>
                    </Col>

                    <Col sm='2'>
                      <div className='form-check'>
                        <Input type='checkbox' id='include_division_head' checked={item?.include_division_head} onChange={() => {
                            onChangeCheck({
                              value:!item?.include_division_head, 
                              name:'include_division_head', 
                              department_id:item.department_id
                            })
                          }}
                        />
                        <Label for='include_division_head'>Include Division Head</Label>
                      </div>
                    </Col>

                    <Col sm='2'>
                      <div className='form-check'>
                        <Input type='checkbox' id='include_hr' checked={item?.include_hr} onChange={() => {
                            onChangeCheck({
                              value:!item?.include_hr, 
                              name:'include_hr', 
                              department_id:item.department_id
                            })
                          }}
                        />
                        <Label for='include_hr'>Include HR</Label>
                      </div>
                    </Col>

                    <Col sm='2'>
                      <div className='form-check'>
                        <Input type='checkbox' id='include_final_approver' checked={item?.include_final_approver} onChange={() => {
                            onChangeCheck({
                              value:!item?.include_final_approver, 
                              name:'include_final_approver', 
                              department_id:item.department_id
                            })
                          }}
                        />
                        <Label for='include_final_approver'>Include Final Approver</Label>
                      </div>
                    </Col>       
                  </Row>                
              </div>
              )
            })}

              <Row>
                <Col className='d-flex' md={{ size: 3, offset: 9 }}>
                  <Button className='me-1' color='primary' type='submit' onClick={onSubmit}>
                    Submit
                  </Button>
                  <Button outline color='secondary' type='reset'>
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
     
  )
}
export default DepartmentSettings

