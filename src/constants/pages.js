export const pages = {
  dashboardKintoBlocksList: 'DASHBOARD_KINTO_BLOCKS_LIST',
  dashboardKintoBlocksCreate: 'DASHBOARD_KINTO_BLOCKS_CREATE',
  dashboardKintoBlocksManage: 'DASHBOARD_KINTO_BLOCKS_VIEW',

  dashboardKintoAppsList: 'DASHBOARD_KINTO_APPS_LIST',
  dashboardKintoAppsCreate: 'DASHBOARD_KINTO_APPS_CREATE',
  dashboardKintoAppsEnvironmentEdit: 'DASHBOARD_KINTO_APPS_ENVIRONMENT_EDIT',
  dashboardKintoAppsManage: 'DASHBOARD_KINTO_APPS_MANAGE',
  dashboardKintoAppsEnvironmentsLogs: 'DASHBOARD_KINTO_APPS_ENVIRONMENTS_LOGS',
  dashboardKintoAppsChangelogs: 'DASHBOARD_KINTO_APPS_CHANGELOGS',
  dashboardKintoAppsEnvironments: 'DASHBOARD_KINTO_APPS_ENVIRONMENTS',
  dashboardKintoAppsDependenciesConfig:
    'DASHBOARD_KINTO_APPS_DEPENDENCIES_CONFIG',

  dashboardHome: 'DASHBOARD_HOME',
  dashboardAnalytics: 'DASHBOARD_ANALYTICS',
  dashboardSalesdata: 'DASHBOARD_SALESDATA',
  dashboardSettings: 'DASHBOARD_SETTINGS',
  dashboardHosting: 'DASHBOARD_HOSTING',
  dashboardBilling: 'DASHBOARD_BILLING',

  workspaceCreate: 'WORKSPACE_CREATE',
  workspaceEdit: 'WORKSPACE_EDIT'
}

export const urls = {
  [pages.dashboardKintoBlocksList]:
    '/app/dashboard/:workspaceId/kintoblocks/list',
  [pages.dashboardKintoBlocksCreate]:
    '/app/dashboard/:workspaceId/kintoblocks/create',
  [pages.dashboardKintoBlocksManage]:
    '/app/dashboard/:workspaceId/kintoblocks/:id/versions/:version/:type',
  [pages.dashboardKintoAppsList]: '/app/dashboard/:workspaceId/kintoapps/list',
  [pages.dashboardKintoAppsCreate]:
    '/app/dashboard/:workspaceId/kintoapps/create',
  [pages.dashboardKintoAppsManage]:
    '/app/dashboard/:workspaceId/kintoapps/:id/versions/:version',
  [pages.dashboardKintoAppsEnvironments]:
    '/app/dashboard/:workspaceId/kintoapps/:id/environments',
  [pages.dashboardKintoAppsChangelogs]:
    '/app/dashboard/:workspaceId/kintoapps/:id/changelogs',
  [pages.dashboardKintoAppsEnvironmentEdit]:
    '/app/dashboard/:workspaceId/kintoapps/:id/environment/:envId/edit',
  [pages.dashboardKintoAppsEnvironmentsLogs]:
    '/app/dashboard/:workspaceId/kintoapps/:id/environment/:envId/logs/:releaseVersion',
  [pages.dashboardKintoAppsDependenciesConfig]:
    '/app/dashboard/:workspaceId/kintoapps/:id/versions/:version/config/:envId',
  [pages.dashboardHome]: '/app/dashboard/:workspaceId',
  [pages.dashboardAnalytics]: '/app/dashboard/:workspaceId/analytics',
  [pages.dashboardSalesdata]: '/app/dashboard/:workspaceId/salesdata',
  [pages.dashboardSettings]: '/app/dashboard/:workspaceId/settings',
  [pages.dashboardHosting]: '/app/dashboard/:workspaceId/hosting',
  [pages.dashboardBilling]: '/app/dashboard/:workspaceId/billing',
  [pages.workspaceCreate]: '/app/workspaces/create',
  [pages.workspaceEdit]: '/app/workspaces/:id/edit'
}

export const dashboardSidebar = [
  {
    key: pages.dashboardHome,
    title: 'Home',
    className: 'home',
    url: urls[pages.dashboardHome],
    group: 1
  },
  {
    title: 'Applications',
    className: 'kintoapps',
    url: urls[pages.dashboardKintoAppsList],
    addUrl: urls[pages.dashboardKintoAppsCreate],
    children: [
      {
        key: pages.dashboardKintoAppsList,
        url: urls[pages.dashboardKintoAppsList]
      },
      {
        key: pages.dashboardKintoAppsCreate,
        url: urls[pages.dashboardKintoAppsCreate]
      },
      {
        key: pages.dashboardKintoAppsManage,
        url: urls[pages.dashboardKintoAppsManage]
      },
      {
        key: pages.dashboardKintoAppsEnvironments,
        url: urls[pages.dashboardKintoAppsEnvironments]
      },
      {
        key: pages.dashboardKintoAppsEnvironmentEdit,
        url: urls[pages.dashboardKintoAppsEnvironmentEdit]
      },
      {
        key: pages.dashboardKintoAppsDependenciesConfig,
        url: urls[pages.dashboardKintoAppsDependenciesConfig]
      },
      {
        key: pages.dashboardKintoAppsChangelogs,
        url: urls[pages.dashboardKintoAppsChangelogs]
      }
    ],
    group: 1
  },
  {
    key: pages.dashboardAnalytics,
    title: 'Analytics',
    className: 'analytics',
    url: urls[pages.dashboardAnalytics],
    group: 1
  },
  {
    title: 'KintoBlocks',
    className: 'kintoblocks',
    url: urls[pages.dashboardKintoBlocksList],
    addUrl: urls[pages.dashboardKintoBlocksCreate],
    children: [
      {
        key: pages.dashboardKintoBlocksList,
        url: urls[pages.dashboardKintoBlocksList]
      },
      {
        key: pages.dashboardKintoBlocksManage,
        url: urls[pages.dashboardKintoBlocksManage]
      },
      {
        key: pages.dashboardKintoBlocksCreate,
        url: urls[pages.dashboardKintoBlocksCreate]
      }
    ],
    group: 1
  },
  {
    key: pages.dashboardSalesdata,
    title: 'Sales Data',
    className: 'sales-data',
    url: urls[pages.dashboardSalesdata],
    group: 1
  },
  {
    key: pages.dashboardSettings,
    title: 'App Settings',
    className: 'settings',
    url: urls[pages.dashboardSettings],
    group: 2
  },
  {
    key: pages.dashboardHosting,
    title: 'Hosting',
    className: 'hosting',
    url: urls[pages.dashboardHosting],
    group: 2
  },
  {
    key: pages.dashboardBilling,
    title: 'Account Billing',
    className: 'billing',
    url: urls[pages.dashboardBilling],
    group: 2
  }
]

export const marketSidebar = []
