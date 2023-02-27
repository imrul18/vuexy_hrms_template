import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      {/* <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='me-50' />
          <span className='fw-bold'>Account</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <Lock size={18} className='me-50' />
          <span className='fw-bold'>Change Password</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
