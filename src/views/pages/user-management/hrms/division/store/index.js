// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('divisions/getAllData', async (param) => {
  const response = await axios.get('/division', {params: param})
  return response.data
})

export const getAllRole = createAsyncThunk('divisions/getAllRole', async () => {
  const response = await axios.get('/roles')
  return response
})

export const getAllDesignation = createAsyncThunk('divisions/getAllDesignation', async () => {
  const response = await axios.get('/designations')
  return response
})

export const getAllDivision = createAsyncThunk('divisions/getAllDivision', async () => {
  const response = await axios.get('/division')
  return response.data
})

export const getAllDepartment = createAsyncThunk('divisions/getAllDepartment', async (id) => {
  const response = await axios.get(`/division/${id}`)
  return response
})

export const getAllEmployee = createAsyncThunk('appUsers/getAllEmployee', async () => {
  const response = await axios.get('employees-employees')
  return response.data
})

export const updateDivision = createAsyncThunk('appUsers/updateDivision', async (data, {dispatch}) => {
  const response = await axios.post('division-update', data)
  dispatch(getAllData())
  return response.data
})

export const getData = createAsyncThunk('divisions/getData', async params => {
  const response = await axios.get(`/employee`)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('divisions/getUser', async id => {
  const response = await axios.get(`/employees/${id}`)
  return response
})

export const addDivision = createAsyncThunk('divisions/addDivision', async (data, {dispatch}) => {
  await axios.post('/division', data)
  await dispatch(getAllData())
  return user
})

export const deleteDivision = createAsyncThunk('divisions/deleteDivision', async (id, { dispatch }) => {
  await axios.delete(`/division/${id}`)
  await dispatch(getAllData())
  return id
})

export const divisionsSlice = createSlice({
  name: 'divisions',
  initialState: {
    data: [],
    permission: {},
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
      .addCase(getAllDesignation.fulfilled, (state, action) => {
        const res = action.payload.data.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.designationOptions = [{ value: '', label: 'Select Designation'}, ...res]
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.data = action.payload.divisions.data
        state.permission = action.payload.permission
        state.total = action.payload.divisions.total
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload?.data
      })
      .addCase(getAllDivision.fulfilled, (state, action) => {
        const res = action.payload.divisions.data.map(item => {
          return ({value: item.id, label: item.name})
        })
        state.divisionOptions = [{ value: '', label: 'Select Division'}, ...res]
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        const res = action.payload?.data?.departments?.map(item => {
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

export default divisionsSlice.reducer
