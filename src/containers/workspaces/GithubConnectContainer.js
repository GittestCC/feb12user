import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GithubConnect from '../../components/workspaces/GithubConnect'
import { getPageUrl } from '../../helpers/urlHelper'
import { pages } from '../../constants/pages'
import qs from 'query-string'

function mapDispatchToProps(dispatch, { location }) {
  return {
    connectGithub: () => {
      const { code, state: workspaceId } = qs.parse(location.search)
      if (!code || !workspaceId) {
        dispatch(push('/'))
      }
      // TODO when api is done dispatch connectGithub instead
      Promise.resolve({ code, workspaceId }).then(() => {
        dispatch(push(getPageUrl(pages.workspaceEdit, { id: workspaceId })))
      })
    }
  }
}

export default connect(undefined, mapDispatchToProps)(GithubConnect)
