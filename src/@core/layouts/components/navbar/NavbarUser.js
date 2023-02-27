// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { Button, NavItem, NavLink } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setRoadMap } from '@src/redux/globalStore'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  const dispatch = useDispatch()
  const {roadMap} = useSelector(state => state.global)

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      <div className='mx-5'>
        <Button color='danger' onClick={() => dispatch(setRoadMap(roadMap === 1 ? 2 : 1))}>Instructions</Button>
      </div>
      {/* <IntlDropdown /> */}
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      {/* <NavbarSearch /> */}
      {/* <CartDropdown /> */}
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
