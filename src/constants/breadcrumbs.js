import { pages, urls } from './pages'

const KintoAppsText = {
  component: 'Link',
  text: 'Applications',
  url: urls[pages.dashboardKintoAppsList]
}

const KintoBlocksText = {
  component: 'Link',
  text: 'KintoBlocks',
  url: urls[pages.dashboardKintoBlocksList]
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
  [pages.dashboardKintoAppsChangelogs]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'Link',
      text: 'Changelogs'
    }
  ],
  [pages.dashboardDocumentationEndpoints]: [
    {
      component: 'KintoBlockDocumentationNameTextContainer'
    },
    {
      component: 'EndpointInfoSwitcherContainer'
    },
    {
      component: 'KintoBlockTagAndBranchDropDownContainer',
      url: urls[pages.dashboardDocumentation],
      isDocumentation: true
    }
  ],
  [pages.dashboardKintoAppsEnvironmentsLogs]: [
    KintoAppsText,
    {
      component: 'KintoSwitcherContainer',
      type: KINTOAPP
    },
    {
      component: 'Link',
      text: 'Environments',
      url: urls[pages.dashboardKintoAppsEnvironments]
    },
    {
      component: 'KintoAppEnvironmentSwitcherContainer',
      url: urls[pages.dashboardKintoAppsEnvironmentEdit]
    },
    {
      component: 'KintoAppEnvironmentReleaseSwitcherContainer',
      url: urls[pages.dashboardKintoAppsEnvironmentsLogs]
    },
    {
      component: 'Link',
      text: 'View Logs'
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
