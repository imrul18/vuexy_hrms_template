// ** Reactstrap Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardBody, Col, Input, Form, Button, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { addPreference, getAllEmployee, getAllPreference } from '../store'

import Instructions from '@src/views/components/instractions'

const Preference = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPreference())
    dispatch(getAllEmployee())
  }, [])

  const [data, setData] = useState(null)
  const {preference, employeesOptions} = useSelector(state => state.masterSettings)
  const [defaultCheck, setDefaultCheck] = useState(false)

  useEffect(() => {
    setData({...preference, replace_all:false})
  }, [preference, employeesOptions])
  

  const onChangeText = (e) => {  
    setData({...data, [e.target.name] : e.target.value})
  }

  const onSubmit = (e) => {   
    e.preventDefault()
    dispatch(addPreference(data))
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Preference</CardTitle>
      </CardHeader>

      <CardBody>
        <Instructions name='preference'/>            
        <Form>
          <Row className='mb-1'>
            <Label sm='3' for='hierarchy_level'>
              Hierarchy Level
            </Label>
            <Col sm='2'>
              <Input type='text' 
                name='hierarchy_level' 
                id='hierarchy_level' 
                value={data?.hierarchy_level}
                placeholder='Set Hierarchy Level' 
                onChange={onChangeText}
              />
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='system-hr'>
              System HR
            </Label>
            <Col sm='3'>
            <Select
                isClearable={false}
                value={employeesOptions?.find(item => item?.value === data?.hr_id)}
                options={employeesOptions}
                className='react-select'
                classNamePrefix='select-hr'
                id='hr_id'
                onChange={data => {       
                  onChangeText({target:{value:data?.value, name:'hr_id'}})              
                }}
              />
            </Col>
          </Row>
          <Row className='mb-1'>
            <Label sm='3' for='system-hr'>
              Final Approver
            </Label>
            <Col sm='3'>
            <Select
                isClearable={false}
                value={employeesOptions?.find(item => item?.value === data?.final_approver_id)}
                options={employeesOptions}
                className='react-select'
                classNamePrefix='select-current-approver'
                id='final_approver_id'
                onChange={data => {      
                  onChangeText({target:{value:data?.value, name:'final_approver_id'}})              
                }}
              />
            </Col>
          </Row>
               

          <Row className='mb-1'>
            <Col sm={{ size: 9, offset: 3 }}>
              <div className='form-check'>
                <Input type='checkbox' id='replace_all' checked={data?.replace_all} onChange={() => {
                    setDefaultCheck(!defaultCheck)
                    onChangeText({target:{value:!defaultCheck, name:'replace_all'}})
                  }}
                />
                <Label for='replace_all'>Replace for All Department Settings</Label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit' id='submit' onClick={onSubmit}>
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
export default Preference

