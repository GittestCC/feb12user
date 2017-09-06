import { connect } from 'react-redux'
import App from '../components/App'

function mapStateToProps(state) {
  const { canSave } = state.pageOptions
  return {
    blockNavigate: canSave
  }
}

export default connect(mapStateToProps)(App)
