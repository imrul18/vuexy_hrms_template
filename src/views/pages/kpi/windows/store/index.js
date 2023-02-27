// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// period list
export const getAllData = createAsyncThunk('windows/getAllData', async (param) => {
  const response = await axios.get('/windows', {params: param})
  return response.data
})

// get period
export const getPeriod = createAsyncThunk('windows/getPeriod', async () => {
  const response = await axios.get('/period-window')
  return response.data
})

export const getAllPeriodData = createAsyncThunk('windows/getAllDepartment', async (id) => {
  const response = await axios.get(`windows-data/${id}`)  
  return response.data
})

export const getAllEmployeeForWindow = createAsyncThunk('windows/getAllEmployeeForWindow', async (id) => {
  const response = await axios.get(`/all-employee/${id}`)
  return response.data
})

//add Window
export const addWindow = createAsyncThunk('windows/addWindow', async (data) => {
  const res = await axios.post('/windows', data)
  if (res?.status === 200 || res?.status === 201) {
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

//edit window
export const getWindow = createAsyncThunk('windows/getWindow', async (id) => {
  const response = await axios.get(`/windows/${id}`)
  return response.data
})
export const updateWindow = createAsyncThunk('windows/updateWindow', async (data) => {
  const res = await axios.post('/update-windows', data)  
  if (res?.status === 200 || res?.status === 201) {
    return {success: true}
  } else {
    return {success: false, error: res?.response?.data}
  }
})

//window employee
export const getWindowEmployee = createAsyncThunk('windows/getWindowEmployee', async (data) => {
  const response = await axios.get(`/window-employee/${data?.id}`, {params: data?.param})
  return response.data
})

export const removeWindowEmployee = createAsyncThunk('windows/removeWindowEmployee', async (data, {dispatch}) => {
  const response = await axios.get(`/remove-window-employee/${data?.window_employee_id}`)
  await dispatch(getWindowEmployee(data))
  return response.data
})

export const addWindowEmployee = createAsyncThunk('windows/addWindowEmployee', async (data, {dispatch}) => {
  const response = await axios.post(`/add-window-employee`, data)
  await dispatch(getWindowEmployee(data))
  await dispatch(getAllEmployeeForWindow(data?.id))
  return response.data
})

//window employee
export const startPeriod = createAsyncThunk('windows/startPeriod', async (data, {dispatch}) => {
  const response = await axios.post(`/start-period/${data?.id}`)
  await dispatch(getWindowEmployee(data))
  return response.data
})

export const completePeriod = createAsyncThunk('windows/completePeriod', async (data, {dispatch}) => {
  const response = await axios.post(`/complete-period/${data?.id}`)
  await dispatch(getWindowEmployee(data))
  return response.data
})

export const startEvaluation = createAsyncThunk('windows/startEvaluation', async (data, {dispatch}) => {
  const response = await axios.post(`/start-evaluation/${data?.id}`)
  await dispatch(getWindowEmployee(data))
  return response.data
})


export const periodsSlice = createSlice({
  name: 'windows',
  initialState: {
    permission: {},
    allData: [],
    data: [],
    total: 1,

    params: {},

    periodData :null,
    periodOptions :[],
    departmentOptions:[],
    employeeOptions:[],
    allEmployeeOptions:[],
    statusOptions :[
      { value: '', label: 'Select Status'},
      { value: '1', label: 'Active'},
      { value: '0', label: 'Deactive'}
    ],

    //edit window
    windowData : null,

    //window Employee
    Window: {},
    WindowEmployee: [],
    kpistatusOptions: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {        
        state.data = action.payload?.windows?.data   
        state.permission = action.payload?.permission    
        state.total = action.payload.windows?.total
      })
      .addCase(getPeriod.fulfilled, (state, action) => {  
        const data = action.payload?.map(item => {
          return ({label:item?.name, value: item?.id})
        })            
        state.periodOptions = data
      })
      .addCase(getAllPeriodData.fulfilled, (state, action) => {
        state.departmentOptions = action.payload?.department
        state.employeeOptions = action.payload?.employees
        state.allEmployeeOptions = action.payload?.allEmployees
        state.periodData = action.payload?.periodData
      })
      .addCase(getWindowEmployee.fulfilled, (state, action) => {
        state.WindowEmployee = action.payload?.employees?.data   
        state.Window = action.payload?.window   
        state.permission = action.payload?.permission    
        state.kpistatusOptions = action.payload?.statusOptions    
        state.total = action.payload.employees?.total
      })
      .addCase(getWindow.fulfilled, (state, action) => {
        state.windowData = action.payload        
      })
      .addCase(addWindow.fulfilled, (state, action) => {        
        if (action.payload?.success) {
          state.periodData = null
        }        
      })
      .addCase(updateWindow.fulfilled, (state, action) => {        
        if (action.payload?.success) {
          state.periodData = null
        }        
      })
      .addCase(getAllEmployeeForWindow.fulfilled, (state, action) => {
        state.allEmployeeOptions = action.payload?.allEmployees
      })
  }
})

export default periodsSlice.reducer
