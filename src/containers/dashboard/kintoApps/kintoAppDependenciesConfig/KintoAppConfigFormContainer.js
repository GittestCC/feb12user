import { connect } from 'react-redux'
import { change, untouch } from 'redux-form'
import { getKintoAppDependenciesEnvConfig } from '../../../../selectors/kintoApps'
import { updateAppDependenciesConfigData } from '../../../../actions/kintoApps'
import KintoAppConfigForm from '../../../../components/dashboard/kintoApps/kintoAppDependenciesConfig/KintoAppConfigForm'

function mapStateToProps(
  state,
  {
    id,
    ver,
    env,
    activeTab,
    allDependenciesInfo = [],
    shownDependenciesIds = []
  }
) {
  const data = getKintoAppDependenciesEnvConfig(state, {
    id,
    ver,
    env
  })

  return {
    initialValues: {
      data
    },
    allDependenciesInfo,
    shownDependenciesIds
  }
}

function mapDispatchToProps(dispatch, { id, ver, env }) {
  return {
    onSubmit: data =>
      dispatch(updateAppDependenciesConfigData(id, ver, env, data)),
    resetCPUHandler: itemIndex => {
      dispatch(
        change('kintoAppConfigForm', `${itemIndex}.hardwareData.minCpu`, '')
      )
      dispatch(
        change('kintoAppConfigForm', `${itemIndex}.hardwareData.maxCpu`, '')
      )
      dispatch(
        untouch(
          'kintoAppConfigForm',
          `${itemIndex}.hardwareData.minCpu`,
          `${itemIndex}.hardwareData.maxCpu`
        )
      )
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(KintoAppConfigForm)
