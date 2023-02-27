// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { editPeriod } from '../store'

const SidebarEditUsers = ({ open, toggleSidebar, editData }) => {
  const dispatch = useDispatch()
  
  const [data, setData] = useState()
  const [errors, setErrors] = useState()

  const store = useSelector(state => state.periods)

  const [currentStatus, setCurrentStatus] = useState()


  useEffect(() => {
    setData(editData)
  }, [editData])
  
  // ** Vars
  const {
    control    
  } = useForm()

  // ** Function to handle form submit
  const onSubmit = async(e) => {
    e.preventDefault()
    const res = await dispatch(editPeriod(data))
    if (res?.payload?.success) {
      toggleSidebar()
      setErrors(null)
      setCurrentStatus(null)
    } else {
      setErrors(res?.payload?.error?.errors)
    }
  }

  const onChangeText = (e) => {        
    setData({...data, [e.target.name] : e.target.value})
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Edit Periods'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={() => setData(null)}
    >
      <Form>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input id='name' invalid={errors?.name && true} {...field} onChange={onChangeText} value={data?.name}/>
            )}
          />
          {errors?.name && <p className='text-danger'>{errors?.name[0]}</p>}
        </div>  

        <div className='mb-1'>
          <Label className='form-label' for='duration'>
            Duration <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='duration'
            control={control}
            render={({ field }) => (
              <Input id='duration' type='number' invalid={errors?.duration && true} {...field} onChange={onChangeText} value={data?.duration}/>
            )}
          />
          {errors?.duration && <p className='text-danger'>{errors?.duration[0]}</p>}
        </div>  

        <div className='mb-1'>
          <Label className='form-label' for='weightage'>
            Weightage <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='weightage'
            control={control}
            render={({ field }) => (
              <Input id='weightage' type='number' invalid={errors?.weightage && true} {...field} onChange={onChangeText} value={data?.weightage}/>
            )}
          />
          {errors?.weightage && <p className='text-danger'>{errors?.weightage[0]}</p>}
        </div>  

        <div className='mb-1'>
          <Label className='form-label' for='min_goal'>
            Minimum Goals <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='min_goal'
            control={control}
            render={({ field }) => (
              <Input id='min_goal' type='number' invalid={errors?.min_goal && true} {...field} onChange={onChangeText} value={data?.min_goal}/>
            )}
          />
          {errors?.min_goal && <p className='text-danger'>{errors?.min_goal[0]}</p>}
        </div>  

        <div className='mb-1'>
          <Label className='form-label' for='max_goal'>
            Maximum Goals <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='max_goal'
            control={control}
            render={({ field }) => (
              <Input id='max_goal' type='number' invalid={errors?.max_goal && true} {...field} onChange={onChangeText} value={data?.max_goal}/>
            )}
          />
          {errors?.max_goal && <p className='text-danger'>{errors?.max_goal[0]}</p>}
        </div>  

        
        <div className='mb-1'>
          <Label className='form-label' for='select-plan'>
            Select Status <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}
                value={currentStatus}
                options={store.statusOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  setCurrentStatus(data)        
                  onChangeText({target:{value:data.value, name:'status'}})              
                }}
              />
            {errors?.status && <p className='text-danger'>{errors?.status[0]}</p>}
        </div>        

        <Button type='submit' className='me-1' color='primary' onClick={onSubmit}>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarEditUsers
