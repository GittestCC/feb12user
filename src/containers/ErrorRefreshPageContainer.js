import { connect } from 'react-redux'
import { showErrorRefreshPage } from '../actions/pageOptions'
import ErrorRefreshPage from '../components/ErrorRefreshPage'

function mapStateToProps(state) {
  return {
    isErrorRefreshPageShown: state.pageOptions.isErrorRefreshPageShown
  }
}

export default connect(mapStateToProps, { showErrorRefreshPage })(
  ErrorRefreshPage
)
