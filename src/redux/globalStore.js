// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const setRoadMap = createAsyncThunk('global/setRoadMap', async (value) => {
  return value
})

export const getAllNotifications = createAsyncThunk('global/getAllNotifications', async (id) => {
  const response = await axios.get(`notification/${id}`)
  return response.data
})

export const getAllPermission = createAsyncThunk('global/getAllPermission', async () => {
  const response = await axios.get(`permissions`)
  return response.data
})

export const AllNotifications = createAsyncThunk('global/AllNotifications', async () => {
  const response = await axios.get(`notification`)
  return response.data
})

export const readNotifications = createAsyncThunk('global/readNotifications', async (data, {dispatch}) => {
  const response = await axios.get(`notification/read/${data?.id}`)
  await dispatch(getAllNotifications(data?.user_id))
  return response.data
})

export const pushNotifications = createAsyncThunk('global/pushNotifications', async (data) => {
  return data
})

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    roadMap: false,
    notifications: [],
    allNotifications : [],
    allPermission : []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setRoadMap.fulfilled, (state, action) => {
        state.roadMap = action.payload
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload
      })  
      .addCase(pushNotifications.fulfilled, (state, action) => {
        state.notifications = [action.payload, ...state.notifications]
      }) 
      .addCase(AllNotifications.fulfilled, (state, action) => {
        state.allNotifications = action.payload
      }) 
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.allPermission = action.payload
        localStorage.setItem('userPermission', JSON.stringify(action.payload))
      })             
  }
})

export default globalSlice.reducer