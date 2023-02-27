// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { addDepartment } from '../store'

const defaultValues = {
  name: '',
  division_id: '',
  description: ''
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  
  const [data, setData] = useState({
    name: '',
    division_id: '',
    description: ''
  })

  const store = useSelector(state => state.department)
  const [currentDivision, setCurrentDivision] = useState({ value: '', label: 'Select Division' })

  // ** Vars
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
    // if (checkIsValid(data)) {
      dispatch(addDepartment(data))
      toggleSidebar()
    // } else {
    //   for (const key in data) {
    //     if (data[key] === null) {
    //       setError('country', {
    //         type: 'manual'
    //       })
    //     }
    //     if (data[key] !== null && data[key].length === 0) {
    //       setError(key, {
    //         type: 'manual'
    //       })
    //     }
    //   }
    // }
  }

  const onChangeText = (e) => {        
    setData({...data, [e.target.name] : e.target.value})
  }


  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={() => setData(defaultValues)}
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
              <Input id='name' placeholder='Department Name' invalid={errors.name && true} {...field} onChange={onChangeText} value={data?.name}/>
            )}
          />
        </div> 
        <div className='mb-1'>
          <Label className='form-label' for='select-plan'>
            Select Division <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}
                value={currentDivision}
                options={store.divisionOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  setCurrentDivision(data)      
                  onChangeText({target:{value:data.value, name:'division_id'}})            
                }}
              />
        </div>
        
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Input
                type='textarea'
                id='description'
                invalid={errors.description && true}
                {...field}
                value={data?.description}
                onChange={onChangeText}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
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

export default SidebarNewUsers
