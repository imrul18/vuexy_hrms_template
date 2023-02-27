// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

//preference
export const getAllPreference = createAsyncThunk('masterSettings/getAllPreference', async () => {
  const response = await axios.get('/preference-settings')
  return response.data
})
export const getAllEmployee = createAsyncThunk('masterSettings/getAllEmployee', async () => {
  const response = await axios.get('/employees-employees')
  return response.data
})
export const addPreference = createAsyncThunk('masterSettings/addPreference', async (data, {dispatch}) => {
  const response = await axios.post('/preference-settings', data)
  dispatch(getAllPreference())
  return response.data
})

//department-settings
export const getAllDepartmentSettings = createAsyncThunk('masterSettings/getAllDepartmentSettings', async () => {
  const response = await axios.get('/departments-settings')
  return response.data
})
export const setAllDepartmentSettings = createAsyncThunk('masterSettings/setAllDepartmentSettings', async (data, {dispatch}) => {
  const response = await axios.post('/set-departments-settings', data)
  dispatch(getAllPreference())
  return response.data
})

// period list
export const getAllPeriod = createAsyncThunk('masterSettings/getAllPeriod', async () => {
  const response = await axios.get('/periods', {params: {perPage: 'all'}})
  return response.data
})
// employee list
export const getAllData = createAsyncThunk('masterSettings/getAllData', async (param) => {
  const response = await axios.get('/employees-access', {params: param})
  return response.data
})

export const addPeriod = createAsyncThunk('masterSettings/addPeriod', async (data, {dispatch}) => {
  await axios.post('/special-access', data)
  dispatch(getAllData())
  return data
})


// for add employee
export const getAllRole = createAsyncThunk('masterSettings/getAllRole', async () => {
  const response = await axios.get('employees-roles')
  return response.data
})
export const getAllDesignation = createAsyncThunk('masterSettings/getAllDesignation', async () => {
  const response = await axios.get('employees-designations')
  return response.data
})
export const getAllDivision = createAsyncThunk('masterSettings/getAllDivision', async () => {
  const response = await axios.get('employees-divisions')
  return response.data
})
export const getAllDepartment = createAsyncThunk('masterSettings/getAllDepartment', async (id) => {
  const response = await axios.get(`employees-departments/${id}`)
  return response.data
})


export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get(`/employee`)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})


export const masterSettingsSlice = createSlice({
  name: 'masterSettings',
  initialState: {
    permission:{},

    //preference
    preference: [],
    employeesOptions: [],
    accessEmployeesOptions: [],

    //department-settings
    departmentSettings: [],

    //access
    periodOptions:[],

    data: [],
    total: 1,

    params: {},
    allData: [],
    selectedUser: null,

    supervisorOptions:[],
    designationOptions:[],
    roleOptions:[],
    departmentOptions:[],
    divisionOptions:[],
    statusOptions :[
      { value: '', label: 'Select Status'},
      { value: '1', label: 'Active'},
      { value: '0', label: 'Deactive'}
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //preference
      .addCase(getAllRole.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.roleOptions = [{ value: '', label: 'Select Role', number: 0 }, ...res]
      })       
      .addCase(getAllDivision.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.divisionOptions = [{ value: '', label: 'Select Division'}, ...res]
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.departmentOptions = [{ value: '', label: 'Select Department'}, ...res]
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload.users.data
        state.permission = action.payload.permission
        state.total = action.payload.users?.total
      })
      .addCase(getAllPreference.fulfilled, (state, action) => {
        state.preference = action.payload
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: `${item.name} (${item.employee_id})`})
        })
        state.employeesOptions = [{ value: '', label: 'Select'}, ...res]
      })

      .addCase(getAllPeriod.fulfilled, (state, action) => {
        const res = action.payload?.periods?.data?.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.periodOptions = res
      })

      //department-settings
      .addCase(getAllDepartmentSettings.fulfilled, (state, action) => {
        state.departmentSettings = action.payload.map(item => {

          let special_access = false
          if  (item?.department_settings?.include_special_access_id) {
            special_access = true
          }

          return {...item.department_settings,
           name:item.name, 
           department_id:item.id, 
           include_special_person: special_access,
           special_person: {
            label: item?.department_settings?.special_access?.name ?? 'Select', 
            value: item?.department_settings?.special_access?.id
           }
          }
        })
      })
  }
})

export default masterSettingsSlice.reducer