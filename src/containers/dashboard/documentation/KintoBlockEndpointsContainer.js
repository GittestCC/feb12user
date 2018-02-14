import { connect } from 'react-redux'
import KintoBlockEndpoints from '../../../components/dashboard/documentation/KintoBlockEndpoints'
import {
  fetchKintoBlockDocumentation,
  fetchKintoBlockDocumentationEndpoint,
  fetchKintoBlockForDocumentation
} from '../../../actions/documentation'

function mapStateToProps(state, { match }) {
  let { id, version, type } = match.params
  const kintoBlock = state.documentation.selectedKintoBlock || {}
  let buildId = kintoBlock.version ? kintoBlock.version.buildId : ''

  const isLoaded =
    id !== state.documentation.selectedKintoBlockId &&
    state.documentation.isLoaded === false
      ? false
      : true

  let endpointList = state.documentation
    ? state.documentation.allIds.map(id => {
        let endpoint = state.documentation.byId[id]

        return {
          id: endpoint.id,
          type: endpoint.type,
          url: endpoint.url
        }
      })
    : []

  const firstEndpointId = endpointList.length ? endpointList[0].id : ''

  return {
    id,
    version,
    type,
    buildId,
    kintoBlock,
    isLoaded,
    endpointList,
    firstEndpointId
  }
}

export default connect(mapStateToProps, {
  fetchKintoBlockForDocumentation,
  fetchKintoBlockDocumentation,
  fetchKintoBlockDocumentationEndpoint
})(KintoBlockEndpoints)
