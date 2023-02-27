// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getRoles = createAsyncThunk('permissions/getRoles', async () => {
  const response = await axios.get('/roles')
  return response.data
})

export const addRoles = createAsyncThunk('permissions/addRoles', async (data, {dispatch}) => {
  const response = await axios.post('/roles', data)
  await dispatch(getRoles())
  return response
})

export const deleteRoles = createAsyncThunk('permissions/deleteRoles', async (id, {dispatch}) => {
  const response = await axios.delete(`/roles/${id}`)
  await dispatch(getRoles())
  return response
})

export const getPermissionList = createAsyncThunk('permissions/getPermissionList', async () => {
  const response = await axios.get('/get-permission')
  return response
})

export const getPermissions = createAsyncThunk('permissions/getPermissions', async (id) => {
  const response = await axios.get(`/roles/${id}`)
  return response
})

export const updatePermissions = createAsyncThunk('permissions/updatePermissions', async (data) => {
  const response = await axios.post(`/roles/${data.id}/permission-update`, data.permission)
  return response
})

export const getData = createAsyncThunk('permissions/getData', async params => {
  const response = await axios.get('/apps/permissions/data', { params })
  return {
    total: response.data.total,
    params: response.data.params,
    allData: response.data.allData,
    data: response.data.permissions
  }
})


export const addPermission = createAsyncThunk(
  'permissions/addPermission',
  async (permission, { dispatch, getState }) => {
    await axios.post('/apps/permissions/add-permission', { permission })
    await dispatch(getData(getState().permissions.params))
    return permission
  }
)

export const updatePermission = createAsyncThunk(
  'permissions/updatePermission',
  async ({ id, name }, { dispatch, getState }) => {
    await axios.post('/apps/permissions/update-permission', { id, name })
    await dispatch(getData(getState().permissions.params))
    return { id, name }
  }
)

export const deletePermission = createAsyncThunk('permissions/deletePermission', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/permissions/delete', { id })
  await dispatch(getData(getState().permissions.params))
  return id
})

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    rolesList: [],
    permission: {},
    permissionList: [],
    rolePermission: [],
    data: [],
    total: 1,
    params: {},
    allData: [],
    selected: null
  },
  reducers: {
    selectPermission: (state, action) => {
      if (action.payload === null) {
        state.selected = null
      } else {
        state.selected = action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    .addCase(getRoles.fulfilled, (state, action) => {
      state.rolesList = action.payload.roles
      state.permission = action.payload.permission
    })
    .addCase(getPermissionList.fulfilled, (state, action) => {
      state.permissionList = action.payload.data
    })
    .addCase(getPermissions.fulfilled, (state, action) => {
      state.rolePermission = action.payload.data.permissions
    })
  }
})

export const { selectPermission } = permissionsSlice.actions

export default permissionsSlice.reducer
