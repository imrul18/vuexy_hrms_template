// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('department/getAllData', async (param) => {
  const response = await axios.get('/department', {params: param})
  return response.data
})

export const getAllDesignation = createAsyncThunk('department/getAllDesignation', async () => {
  const response = await axios.get('/department-divisions')
  return response.data
})

export const getAllRole = createAsyncThunk('department/getAllRole', async () => {
  const response = await axios.get('/roles')
  return response
})

export const getAllEmployee = createAsyncThunk('appUsers/getAllEmployee', async () => {
  const response = await axios.get('employees-employees')
  return response.data
})

export const updateDepartment = createAsyncThunk('appUsers/updateDepartment', async (data, {dispatch}) => {
  const response = await axios.post('department-update', data)
  dispatch(getAllData())
  return response.data
})

export const getAllDivision = createAsyncThunk('department/getAllDivision', async () => {
  const response = await axios.get('/department-divisions')
  return response.data
})

export const getAllDepartment = createAsyncThunk('department/getAllDepartment', async (id) => {
  const response = await axios.get(`/division/${id}`)
  return response
})

export const getData = createAsyncThunk('department/getData', async params => {
  const response = await axios.get(`/employee`)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('department/getUser', async id => {
  const response = await axios.get(`/employees/${id}`)
  return response
})

export const addDepartment = createAsyncThunk('department/addDepartment', async (data, {dispatch}) => {
  await axios.post('/department', data)
  await dispatch(getAllData())
  return data
})

export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (id, { dispatch }) => {
  await axios.delete(`/department/${id}`)
  await dispatch(getAllData())
  return id
})

export const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    permission:{},
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
    headOptions:[],
    designationOptions:[],
    roleOptions:[],
    departmentOptions:[],
    divisionOptions:[],
    statusOptions :[
      { value: '', label: 'Select Status', number: 0 },
      { value: '1', label: 'Active', number: 2 },
      { value: '0', label: 'Deactive', number: 3 }
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllRole.fulfilled, (state, action) => {
        const res = action.payload.data.map(item => {
          return ({value: item.id, label: item.title})
        })
        state.roleOptions = [{ value: '', label: 'Select Role', number: 0 }, ...res]
      })
      .addCase(getAllDivision.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.divisionOptions = [{ value: '', label: 'Select Division'}, ...res]
      })
      .addCase(getAllDesignation.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.designationOptions = [{ value: '', label: 'Select Designation'}, ...res]
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload?.departments.data
        state.permission = action.payload?.permission
        state.total = action.payload?.departments.total
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload?.data
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        const res = action.payload?.data?.department?.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.departmentOptions = [{ value: '', label: 'Select Division'}, ...res]
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        const res = action.payload.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.headOptions = [{ value: '', label: 'Select Supervisor'}, ...res]
      })
  }
})

export default departmentSlice.reducer
