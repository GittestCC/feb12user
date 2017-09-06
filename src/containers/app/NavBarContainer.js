import { connect } from 'react-redux'
import NavBar from '../../components/app/NavBar'

function mapStateToProps(state, { isSideBarShownMobile }) {
  return {
    isDashboard: state.pageOptions.isDashboard,
    isSideBarShownMobile
  }
}

function mapDispatchToProps(dispatch, { toggleNav }) {
  return { toggleNav }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
