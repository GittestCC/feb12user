import { pages, urls } from './pages'
import { getPageUrl } from '../helpers/urlHelper'

const KintoAppsText = {
  component: 'Link',
  text: 'Applications',
  url: getPageUrl(pages.dashboardKintoAppsList)
}

const KintoBlocksText = {
  component: 'Link',
  text: 'KintoBlocks',
  url: getPageUrl(pages.dashboardKintoBlocksList)
}

const KINTOAPP = 'kintoapp'
const KINTOBLOCK = 'kintoblock'

//TODO: improve the LinkContainer component, add in config what it needs from store

export default {
  [pages.dashboardKintoBlocksList]: [KintoBlocksText],
  [pages.dashboardKintoBlocksCreate]: [
    KintoBlocksText,
    {
      component: 'Link',
      text: 'Create New KintoBlock'
    }
  ],
  [pages.dashboardKintoBlocksManage]: [
    KintoBlocksText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOBLOCK
    },
    {
      component: 'KintoBlockTagAndBranchDropDownContainer',
      url: urls[pages.dashboardKintoBlocksManage]
    }
  ],
  [pages.dashboardKintoAppsList]: [KintoAppsText],
  [pages.dashboardKintoAppsCreate]: [
    KintoAppsText,
    {
      component: 'Link',
      text: 'Create New Application'
    }
  ],
  [pages.dashboardKintoAppsManage]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'KintoAppTagSelectorContainer',
      url: urls[pages.dashboardKintoAppsManage]
    }
  ],
  [pages.dashboardKintoAppsEnvironments]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'Link',
      text: 'Environments'
    }
  ],
  [pages.dashboardKintoAppsEnvironmentEdit]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'LinkContainer',
      text: 'Environments',
      url: urls[pages.dashboardKintoAppsEnvironments]
    },
    {
      component: 'KintoAppEnvironmentSwitcherContainer',
      url: urls[pages.dashboardKintoAppsEnvironmentEdit]
    }
  ],
  [pages.dashboardKintoAppsDependenciesConfig]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'KintoAppTagSelectorContainer',
      url: urls[pages.dashboardKintoAppsDependenciesConfig]
    },
    {
      component: 'KintoAppEnvironmentSwitcherContainer',
      url: urls[pages.dashboardKintoAppsDependenciesConfig],
      isDependencyConfig: true
    }
  ],
  [pages.workspaceCreate]: [
    {
      component: 'Link',
      text: 'Workspaces'
    },
    {
      component: 'Link',
      text: 'Create New Workspace'
    }
  ],
  [pages.workspaceEdit]: [
    {
      component: 'Link',
      text: 'Workspaces'
    },
    {
      component: 'WorkspaceSwitcherContainer'
    }
  ]
}
