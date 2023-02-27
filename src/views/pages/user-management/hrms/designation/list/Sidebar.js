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
import { useDispatch } from 'react-redux'
import { addDesignation } from '../store'

const defaultValues = {
  name: '',
  description:''
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  
  const [data, setData] = useState({
    name: '',
    description:''
  })

  // ** Vars
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
    // if (checkIsValid(data)) {
      dispatch(addDesignation(data))
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
      title='New Designation'
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
              <Input id='name' placeholder='' invalid={errors.name && true} {...field} onChange={onChangeText} value={data?.name}/>
            )}
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
                placeholder=''
                invalid={errors.description && true}
                {...field}
                onChange={onChangeText} 
                value={data?.description}
              />
            )}
          />
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
