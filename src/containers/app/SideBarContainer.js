import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getListWithActiveItem } from '../../helpers/pageHelper'
import SideBar from '../../components/app/SideBar'

function mapStateToProps(state, { isSideBarShownMobile }) {
  const { isDashboard, activePage } = state.pageOptions
  return {
    list: getListWithActiveItem(activePage, isDashboard),
    isSideBarShownMobile
  }
}

export default connect(mapStateToProps, {
  navigateTo: push
})(SideBar)
