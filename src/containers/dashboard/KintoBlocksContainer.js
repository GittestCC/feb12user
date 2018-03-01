import { connect } from 'react-redux'
import { fetchKintoBlocks } from '../../actions/kintoBlocks'
import KintoBlocks from '../../components/dashboard/KintoBlocks'

function mapStateToProps(state, { match }) {
  return {
    match
  }
}

export default connect(mapStateToProps, { fetchKintoBlocks })(KintoBlocks)
