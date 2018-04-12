import { connect } from 'react-redux'
import { showErrorPage } from '../actions/pageOptions'
import ErrorPage from '../components/ErrorPage'

function mapStateToProps(state) {
  return {
    errorPageType: state.pageOptions.errorPageType
  }
}

export default connect(mapStateToProps, { showErrorPage })(ErrorPage)
