import Repeater from '@components/repeater'
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Fragment, useEffect, useState } from "react"
import { Plus, Save, X } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Row, Spinner } from 'reactstrap'

import { getGoal, saveGoal, updateGoal } from "../store"

const index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {window_id} = useParams()
  const [loading, setLoading] = useState(false)

  const store = useSelector(state => state.kpiProfile)
  
  const [goal, setGoal] = useState([])
  console.log("🚀 ~ file: index.js:24 ~ index ~ goal", goal)
  const [errors, setErrors] = useState()

  const [remainWeightage, setRemainWeightage] = useState(null)
  const [weightage, setWeightage] = useState(0)
  
  useEffect(() => {
    if (store?.goalList?.length) setGoal(store?.goalList)
    else {
      const array = []
      for (let index = 0; index < store?.windowDetails?.min_goal; index++) {
        array.push({start_date: store?.windowDetails?.period_start_date, end_date: store?.windowDetails?.period_end_date})
      }
      setGoal(array)
    }
  }, [store?.goalList])

  useEffect(() => {
    dispatch(getGoal(window_id))
  }, [])

  useEffect(() => {
    setRemainWeightage(store?.windowDetails?.weightage ?? 0)
  }, [store?.windowDetails])

  useEffect(() => {
    const useWeightage = goal?.reduce((partialSum, item) => parseInt(partialSum ?? 0) + parseInt(item?.weight ? item?.weight : 0), 0)
    setRemainWeightage(parseInt(store?.windowDetails?.weightage) - parseInt(useWeightage))
    setWeightage(parseInt(useWeightage))
    console.log("🚀 ~ file: index.js:50 ~ useEffect ~ useWeightage", useWeightage)
  }, [goal])

  const onChangeData = (e, index) => {
    const {name, value} = e.target
    const data = goal?.map((item, i) => {
      if (i === index) return ({...item, [name]: value})
      else return item      
    })
    setGoal(data)
  }


  const onTextChange = (name, val, index) => {
    const data = goal?.map((item, i) => {
      if (i === index) return ({...item, [name]: val})
      else return item      
    })
    setGoal(data)
  }

  const increaseCount = () => {
    setGoal([...goal, {start_date: store?.windowDetails?.period_start_date, end_date: store?.windowDetails?.period_end_date}])
  }

  const deleteForm = index => {
    const data = goal?.filter((item, i) => i !== index)
    setGoal(data)
  }

  const storeGoal = async(e) => {
    setLoading(true)
    e.preventDefault()
    if (store?.goalListCopy?.length) {
      const newItems = goal.filter(b => !store?.goalListCopy.some(a => JSON.stringify(a) === JSON.stringify(b))) 
      const newItemsIds = []
      newItems?.forEach(element => {
        newItemsIds?.push(element?.id)
      })
      const previous_goals = store?.goalListCopy?.filter(item => newItemsIds?.includes(item?.id))
      const res = await dispatch(updateGoal({previous_goals, goal: newItems, window_id, total_weightage: weightage}))
      if (res?.payload?.success) {
        setTimeout(() => {
          navigate(`/apps/kpi/goal-preview/${store?.windowDetails?.windowEmployee?.id}`)
        }, 500)
      } else {
        setErrors(res?.payload?.error?.errors)
        setLoading(false)
      }    
    } else {
      const res = await dispatch(saveGoal({goal, window_id, total_weightage: weightage}))
      if (res?.payload?.success) {
        setTimeout(() => {
          navigate(`/apps/kpi/goal-preview/${store?.windowDetails?.windowEmployee?.id}`)
        }, 500)
      } else {
        setErrors(res?.payload?.error?.errors)
        setLoading(false)
      }    
    }
  }

  return (
    <Fragment>
          <Card>
      <CardHeader>
        <h4 className='card-title'>Goal Settings</h4>
      </CardHeader>
      <CardBody>
        <Repeater count={goal?.length}>
          {i => {
            const Tag = i === 0 ? 'div' : SlideDown
            return (
              <Tag key={i}>
                <Form>
                  <Row className='justify-content-between align-items-center'>
                    <Col md={12} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-item-name-${i}`}>
                        Goal {i + 1}
                      </Label>
                      <Input type='text' id={`animation-item-name-${i}`} name='goal_name' value={goal[i]?.goal_name} onChange={(e) => onChangeData(e, i)} placeholder='Goal Name' />
                      {errors && Object.keys(errors).filter((key) => key.includes(`goal.${i}.goal_name`)).map((key) => {
                        return <p className="text-danger font-Poppins font-medium my-6">{errors[key] ? errors[key][0] : null}</p>
                      })}
                    </Col>
                    <Col md={6} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-item-name-meets-${i}`}>
                        Meets
                      </Label>
                      <Input type='textarea' name='goal_meet' id='exampleText' rows='3' placeholder='Goal Meets' value={goal[i]?.goal_meet} onChange={(e) => onChangeData(e, i)}/>
                      {errors && Object.keys(errors).filter((key) => key.includes(`goal.${i}.goal_meet`)).map((key) => {
                        return <p className="text-danger font-Poppins font-medium my-6">{errors[key] ? errors[key][0] : null}</p>
                      })}
                    </Col>
                    <Col md={6} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-item-name-exceeds-${i}`}>
                        Exceeds
                      </Label>
                      <Input type='textarea' name='goal_exceed' id='exampleText' rows='3' placeholder='Goal Exceeds' value={goal[i]?.goal_exceed} onChange={(e) => onChangeData(e, i)}/>
                    </Col>

                    <Col md={3} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-start_date-${i}`}>
                        Start Date
                      </Label>
                      <Flatpickr className='form-control' id={`animation-start_date-${i}`} value={goal[i]?.start_date ?? new Date()} onChange={date => onTextChange('start_date', date[0], i)} />
                      {errors && Object.keys(errors).filter((key) => key.includes(`goal.${i}.start_date`)).map((key) => {
                        return <p className="text-danger font-Poppins font-medium my-6">{errors[key] ? errors[key][0] : null}</p>
                      })}
                    </Col>
                    <Col md={3} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-end_date-${i}`}>
                        End Date
                      </Label>
                      <Flatpickr className='form-control' id={`animation-end_date-${i}`} value={goal[i]?.end_date ?? new Date()} onChange={date => onTextChange('end_date', date[0], i)} />
                      {errors && Object.keys(errors).filter((key) => key.includes(`goal.${i}.end_date`)).map((key) => {
                        return <p className="text-danger font-Poppins font-medium my-6">{errors[key] ? errors[key][0] : null}</p>
                      })}
                    </Col>
                    <Col md={3} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-weight-${i}`}>
                        Weightage
                      </Label>
                      <Input type='number' name='weight' id={`animation-weight-${i}`} placeholder={`Remaining weightage ${remainWeightage}`} value={goal[i]?.weight} onChange={(e) => onChangeData(e, i)}/>
                      {errors && Object.keys(errors).filter((key) => key.includes(`goal.${i}.weight`)).map((key) => {
                        return <p className="text-danger font-Poppins font-medium my-6">{errors[key] ? errors[key][0] : null}</p>
                      })}
                      {errors?.total_weightage && <p className="text-danger font-Poppins font-medium my-6">{errors?.total_weightage[0]}</p>}
                    </Col>
                    <Col md={3} className='d-flex justify-content-end'>
                      {goal?.length > store?.windowDetails?.min_goal && <Button color='danger' className='text-nowrap px-1' onClick={() => deleteForm(i)} outline>
                        <X size={14} className='me-50' />
                        <span>Delete</span>
                      </Button>}
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
        {goal?.length < store?.windowDetails?.max_goal && <Button className='btn-icon' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ms-25'>Add New</span>
        </Button>}
        <Button className='btn-icon m-1' color='primary' onClick={storeGoal} disabled={loading}>
          {loading ? <><Spinner className='me-25' size='sm' />Please Wait...</> : <><Save size={16} />
          <span className='align-middle ms-25'>Submit</span></> }
        </Button>
      </CardBody>
    </Card>
    </Fragment>
  )
}
export default index
