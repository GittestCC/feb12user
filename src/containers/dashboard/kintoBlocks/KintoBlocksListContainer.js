import { connect } from 'react-redux'
import { fetchKintoBlocks } from '../../../actions/kintoBlocks'
import { getAllKintoBlocks } from '../../../selectors/kintoBlocks'
import KintoBlockList from '../../../components/dashboard/kintoBlocks/KintoBlocksList'

function mapStateToProps(state) {
  return {
    kintoBlocks: getAllKintoBlocks(state)
  }
}

export default connect(mapStateToProps, {
  fetchKintoBlocks
})(KintoBlockList)
