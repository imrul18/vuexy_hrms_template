// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Third Party Components
import { Controller, useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Form, FormText, Input, Label } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { addUser, getAllDepartment } from '../store'

const defaultValues = {
  name: '',
  email: '',
  designation_id: '',
  department_id: '',
  role:'',
  status: '',
  password: null
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  
  const [data, setData] = useState({
    name: '',
    email: '',
    employee_id: '',
    designation_id: '',
    department_id: '',
    status: '',
    role:'',
    password: null
  })

  const store = useSelector(state => state.users)

  useEffect(() => {   
    if (data?.division_id) dispatch(getAllDepartment(data?.division_id))
  }, [data?.division_id])


  // ** Vars
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
      dispatch(addUser(data))
      toggleSidebar()

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
              <Input id='name' placeholder='Name' invalid={errors.name && true} {...field} onChange={onChangeText} value={data?.name}/>
            )}
          />
        </div>    
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Employee ID <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='employee_id'
            control={control}
            render={({ field }) => (
              <Input id='employee_id' placeholder='V106' invalid={errors.employee_id && true} {...field} onChange={onChangeText} value={data?.employee_id}/>
            )}
          />
        </div>        
        <div className='mb-1'>
          <Label className='form-label' for='email'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='email'
                placeholder='imrul.afnan18@gmail.com'
                invalid={errors.email && true}
                {...field}
                onChange={onChangeText} 
                value={data?.email}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-designation_id'>
            Select Designation 
          </Label>
              <Select
                isClearable={false}
                value={store.designationOptions?.find(item => item?.value === data?.designation_id)}
                options={store.designationOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'designation_id'}})                
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-division'>
            Select Division <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}
                value={store.divisionOptions?.find(item => item?.value === data?.division_id)}
                options={store.divisionOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'division_id'}})                
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-department_id'>
            Select Department <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}
                value={store.departmentOptions?.find(item => item?.value === data?.department_id)}
                options={store.departmentOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'department_id'}})                
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-role'>
            Select Role <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}                
                value={store.roleOptions?.find(item => item?.value === data?.role)}
                options={store.roleOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'role'}})                 
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-supervisor_id'>
            Select Supervisor <span className='text-danger'></span>
          </Label>
          <Select
                isClearable={false}
                value={store.supervisorOptions?.find(item => item?.value === data?.supervisor_id)}
                options={store.supervisorOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'supervisor_id'}})                 
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='select-status'>
            Select Status <span className='text-danger'>*</span>
          </Label>
          <Select
                isClearable={false}
                value={store.statusOptions?.find(item => item?.value === data?.status)}
                options={store.statusOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={data => {
                  onChangeText({target:{value:data.value, name:'status'}})              
                }}
              />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                type='password'
                id='password'
                invalid={errors.password && true}
                {...field}
                value={data?.password}
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
