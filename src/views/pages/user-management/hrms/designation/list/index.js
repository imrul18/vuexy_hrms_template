// ** User List Component
import Table from './Table'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllData } from '../store'

const DesignationList = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllData)
  }, [])
  
  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default DesignationList
