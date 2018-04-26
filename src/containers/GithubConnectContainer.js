import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'query-string'
import { getPageUrl } from '../helpers/urlHelper'
import { pages } from '../constants/pages'
import { pageTypes } from '../constants/github'
import { connectGithub } from '../actions/workspaces'
import GithubConnect from '../components/GithubConnect'

function mapDispatchToProps(dispatch, { location }) {
  return {
    connectGithub: () => {
      const { code, state } = qs.parse(location.search)
      if (!code || !state) {
        dispatch(push('/'))
      }
      const [workspaceId, pageType] = state.split('-')
      dispatch(connectGithub(workspaceId, code)).then(() => {
        const page =
          pageType === pageTypes.KB_CREATE
            ? pages.dashboardKintoBlocksCreate
            : pages.workspaceEdit
        dispatch(push(getPageUrl(page, { workspaceId: workspaceId })))
      })
    }
  }
}

export default connect(undefined, mapDispatchToProps)(GithubConnect)
