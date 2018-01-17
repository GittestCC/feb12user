import { connect } from 'react-redux'
import { formValueSelector, change, untouch } from 'redux-form'
import { createKintoBlock } from '../../../../actions/kintoBlocks'
import KintoBlockCreateForm from '../../../../components/dashboard/kintoBlocks/kintoBlockCreate/KintoBlockCreateForm'

const formName = 'kintoBlockCreateForm'
const selector = formValueSelector(formName)

function mapStateToProps(state) {
  const selectedWorkspace = state.workspaces.selectedWorkspace
  const organizations =
    state.workspaces.byId[selectedWorkspace].organizations || []
  const selectedOrganizationId = selector(state, 'organizationId')
  const isNewRepository = selector(state, 'newRepository') === 'true'
  const organizationIds = organizations.map(o => o.id)
  const selectedRepository = selector(state, 'repositoryId')
  const preFillOrg = organizations.find(o => o.id === selectedOrganizationId)
  const preFillText = preFillOrg ? preFillOrg.name : ''

  return {
    organizationIds,
    selectedRepository,
    selectedOrganizationId,
    organizations,
    isNewRepository,
    preFillText: `${preFillText}/ `,
    initialValues: {
      isPublic: true,
      newRepository: 'true',
      organizationId: organizations[0] ? organizations[0].id : '1'
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: data => dispatch(createKintoBlock(data)),
    selectRepository: data => {
      dispatch(change('kintoBlockCreateForm', 'organizationId', data.orgId))
      dispatch(change('kintoBlockCreateForm', 'repositoryId', data.value))
    },
    fieldCorrection: data => {
      if (data.target.value === 'true') {
        dispatch(change('kintoBlockCreateForm', 'repositoryId', null))
      } else {
        dispatch(change('kintoBlockCreateForm', 'repositoryName', null))
        dispatch(untouch('kintoBlockCreateForm', 'repositoryName'))
      }
    },
    resetCPUHandler: () => {
      dispatch(change('kintoBlockCreateForm', 'hardwareData.minCpu', null))
      dispatch(change('kintoBlockCreateForm', 'hardwareData.maxCpu', null))
      dispatch(
        untouch(
          'kintoBlockCreateForm',
          'hardwareData.minCpu',
          'hardwareData.maxCpu'
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  KintoBlockCreateForm
)
