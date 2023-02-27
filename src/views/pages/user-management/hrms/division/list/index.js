// ** User List Component
import Table from './Table'

// ** Reactstrap Imports

// ** Custom Components

// ** Icons Imports

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllData } from '../store'

const DivisionList = () => {
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

export default DivisionList
