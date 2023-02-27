// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appUsers/getAllData', async (param) => {
  const response = await axios.get('/employees', {params: param})
  return response.data
})
export const getAllRole = createAsyncThunk('appUsers/getAllRole', async () => {
  const response = await axios.get('employees-roles')
  return response.data
})
export const getAllEmployee = createAsyncThunk('appUsers/getAllEmployee', async () => {
  const response = await axios.get('employees-employees')
  return response.data
})
export const getAllDesignation = createAsyncThunk('appUsers/getAllDesignation', async () => {
  const response = await axios.get('employees-designations')
  return response.data
})
export const getAllDivision = createAsyncThunk('appUsers/getAllDivision', async () => {
  const response = await axios.get('employees-divisions')
  return response.data
})
export const getAllDepartment = createAsyncThunk('appUsers/getAllDepartment', async (id) => {
  const response = await axios.get(`employees-departments/${id}`)
  return response.data
})
export const addUser = createAsyncThunk('appUsers/addUser', async (user, {dispatch}) => {
  const res = await axios.post('/employees', user)
  await dispatch(getAllData())
  return res
})
export const updateUser = createAsyncThunk('appUsers/updateUser', async (data, {dispatch}) => {
  const res = await axios.post(`/update-employees/${data?.id}`, data?.data)
  await dispatch(getAllData())
  return res
})
export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get(`/employee`)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})
export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get(`/employees-getuser/${id}`)
  return response
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    permission: {},
    data: [],
    total: 1,

    params: {},
    allData: [],
    selectedUser: null,

    supervisorOptions:[],
    designationOptions:[],
    roleOptions:[],
    divisionOptions:[],
    departmentOptions:[],
    statusOptions :[
      { value: '1', label: 'Active'},
      { value: '0', label: 'Deactive'}
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload.users.data
        state.permission = action.payload.permission
        state.total = action.payload.users?.total
      })  

      .addCase(getAllRole.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.roleOptions = [res]
      })
      .addCase(getAllDesignation.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.designationOptions = [{ value: '', label: 'Select Designation'}, ...res]
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
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        const res = action.payload?.map(item => {
          return ({value: item.id, label: item.name})
        })
        if (res) {
          state.supervisorOptions = [{ value: '', label: 'Select Supervisor'}, ...res]
        } else {
          state.supervisorOptions = [{ value: '', label: 'Select Supervisor'}]
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload?.data
      })
  }
})

export default appUsersSlice.reducer
