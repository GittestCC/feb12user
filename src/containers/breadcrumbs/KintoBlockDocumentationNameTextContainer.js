import { connect } from 'react-redux'
import LinkComponent from '../../components/breadcrumbs/Link'

function mapStateToProps(state) {
  const { documentation } = state

  return {
    text: documentation.selectedKintoBlock
      ? documentation.selectedKintoBlock.name
      : ''
  }
}

export default connect(mapStateToProps)(LinkComponent)
