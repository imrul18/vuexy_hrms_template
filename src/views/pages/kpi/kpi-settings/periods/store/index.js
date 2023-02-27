// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// period list
export const getAllData = createAsyncThunk('periods/getAllData', async (param) => {
  const response = await axios.get('/periods', {params: param})
  return response.data
})

// add period
export const addPeriod = createAsyncThunk('periods/addPeriod', async (data, {dispatch}) => {
  const res = await axios.post('/periods', data)

  if (res?.status === 200 || res?.status === 201) {
    await dispatch(getAllData())
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})
// edit period
export const editPeriod = createAsyncThunk('periods/editPeriod', async (data, {dispatch}) => {
  const res = await axios.post(`/periods/update/${data?.id}`, data)

  if (res?.status === 200 || res?.status === 201) {
    await dispatch(getAllData())
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

// delete period
export const deletePeriod = createAsyncThunk('periods/deletePeriod', async (id, { dispatch }) => {
  await axios.delete(`/periods/${id}`)
  await dispatch(getAllData())
  return id
})

// departmentslist
export const getAllDepartment = createAsyncThunk('periods/getAllDepartment', async () => {
  const response = await axios.get(`/department`, {params: {perPage:'all'}})
  return response.data
})

// period departmentslist
export const getPeriodDepartment = createAsyncThunk('periods/getPeriodDepartment', async (id) => {
  const response = await axios.get(`/period-departments/${id}`)
  return response.data
})

// period departmentslist
export const updateDepartments = createAsyncThunk('periods/getPeriodDepartment', async ({url_id, data}) => {
  const response = await axios.post(`/period-departments/${url_id}`, data)
  return response.data
})


export const periodsSlice = createSlice({
  name: 'periods',
  initialState: {
    permission: {},
    allData: [],
    data: [],
    total: 1,

    params: {},

    departmentList:[],
    periodDepartment:[],

    statusOptions :[
      { value: '1', label: 'Active'},
      { value: '0', label: 'Deactive'}
    ]
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {        
        state.data = action.payload?.periods?.data   
        state.permission = action.payload?.permission    
        state.total = action.payload.periods?.total
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {      
        state.departmentList = action.payload.departments
      })
      .addCase(getPeriodDepartment.fulfilled, (state, action) => {      
        state.periodDepartment = action.payload
      })
  }
})

export default periodsSlice.reducer
