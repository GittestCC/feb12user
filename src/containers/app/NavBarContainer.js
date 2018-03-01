import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import NavBar from '../../components/app/NavBar'

function mapStateToProps(state, { isSideBarShownMobile }) {
  const { currentUser } = state
  let initials = ''
  if (currentUser.userName) {
    initials = currentUser.userName.substring(0, 2)
  }
  return {
    isDashboard: state.pageOptions.isDashboard,
    isSideBarShownMobile,
    initials
  }
}

function mapDispatchToProps(dispatch, { toggleNavHandler }) {
  return {
    toggleNavHandler,
    logout: () => {
      dispatch(logout())
      // physical refresh
      window.location.href = '/log-in'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
