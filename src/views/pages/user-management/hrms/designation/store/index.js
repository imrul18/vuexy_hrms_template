// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('designation/getAllData', async (param) => {
  const response = await axios.get('/designations', {params: param})
  return response.data
})

export const getAllRole = createAsyncThunk('designation/getAllRole', async () => {
  const response = await axios.get('/roles')
  return response
})

export const getAllDesignation = createAsyncThunk('designation/getAllDesignation', async () => {
  const response = await axios.get('/designation')
  return response
})

export const getAllDivision = createAsyncThunk('designation/getAllDivision', async () => {
  const response = await axios.get('/division')
  return response
})

export const getAllDepartment = createAsyncThunk('designation/getAllDepartment', async (id) => {
  const response = await axios.get(`/division/${id}`)
  return response
})

export const updateDesignation = createAsyncThunk('designation/updateDesignation', async (data, {dispatch}) => {
  const response = await axios.post('designation-update', data)
  dispatch(getAllData())
  return response.data
})

export const getData = createAsyncThunk('designation/getData', async params => {
  const response = await axios.get(`/employee`)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('designation/getUser', async id => {
  const response = await axios.get(`/employees/${id}`)
  return response
})

export const addDesignation = createAsyncThunk('designation/addDesignation', async (data, {dispatch}) => {
  await axios.post('/designations', data)
  await dispatch(getAllData())
  return data
})

export const deleteDesignation = createAsyncThunk('designation/deleteDesignation', async (id, { dispatch }) => {
  await axios.delete(`/designations/${id}`)
  await dispatch(getAllData())
  return id
})

export const designationSlice = createSlice({
  name: 'designation',
  initialState: {
    permission:{},
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
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
        state.data = action.payload.designations.data
        state.total = action.payload.designations.total
        state.permission = action.payload.permission
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload?.data
      })
      .addCase(getAllDivision.fulfilled, (state, action) => {
        const res = action.payload.data.map(item => {
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
  }
})

export default designationSlice.reducer
