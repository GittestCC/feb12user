export const pages = {
  dashboardKintoBlocksList: 'DASHBOARD_KINTO_BLOCKS_LIST',
  dashboardKintoBlocksCreate: 'DASHBOARD_KINTO_BLOCKS_CREATE',
  dashboardKintoBlocksManage: 'DASHBOARD_KINTO_BLOCKS_VIEW',

  dashboardKintoAppsList: 'DASHBOARD_KINTO_APPS_LIST',
  dashboardKintoAppsCreate: 'DASHBOARD_KINTO_APPS_CREATE',
  dashboardKintoAppsEnvironmentEdit: 'DASHBOARD_KINTO_APPS_ENVIRONMENT_EDIT',
  dashboardKintoAppsManage: 'DASHBOARD_KINTO_APPS_MANAGE',
  dashboardKintoAppsEnvironments: 'DASHBOARD_KINTO_APPS_ENVIRONMENTS',
  dashboardKintoAppsDependenciesConfig:
    'DASHBOARD_KINTO_APPS_DEPENDENCIES_CONFIG',

  dashboardHome: 'DASHBOARD_HOME',
  dashboardAnalytics: 'DASHBOARD_ANALYTICS',
  dashboardSalesdata: 'DASHBOARD_SALESDATA',
  dashboardServices: 'DASHBOARD_SERVICES',
  dashboardSettings: 'DASHBOARD_SETTINGS',
  dashboardHosting: 'DASHBOARD_HOSTING',
  dashboardBilling: 'DASHBOARD_BILLING',

  workspaceCreate: 'WORKSPACE_CREATE',
  workspaceEdit: 'WORKSPACE_EDIT'
}

export const urls = {
  [pages.dashboardKintoBlocksList]: '/app/dashboard/kintoblocks/list',
  [pages.dashboardKintoBlocksCreate]: '/app/dashboard/kintoblocks/create',
  [pages.dashboardKintoBlocksManage]:
    '/app/dashboard/kintoblocks/:id/versions/:version',
  [pages.dashboardKintoAppsList]: '/app/dashboard/kintoapps/list',
  [pages.dashboardKintoAppsCreate]: '/app/dashboard/kintoapps/create',
  [pages.dashboardKintoAppsManage]:
    '/app/dashboard/kintoapps/:id/versions/:version',
  [pages.dashboardKintoAppsEnvironments]:
    '/app/dashboard/kintoapps/:id/environments',
  [pages.dashboardKintoAppsEnvironmentEdit]:
    '/app/dashboard/kintoapps/:id/environment/:envId/edit',
  [pages.dashboardKintoAppsDependenciesConfig]:
    '/app/dashboard/kintoapps/:id/versions/:version/config/:envId',
  [pages.dashboardHome]: '/app/dashboard',
  [pages.dashboardAnalytics]: '/app/dashboard/analytics',
  [pages.dashboardSalesdata]: '/app/dashboard/salesdata',
  [pages.dashboardServices]: '/app/dashboard/services',
  [pages.dashboardSettings]: '/app/dashboard/settings',
  [pages.dashboardHosting]: '/app/dashboard/hosting',
  [pages.dashboardBilling]: '/app/dashboard/billing',
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
    addUrl: urls[pages.dashboardKintoAppsList],
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
    key: pages.dashboardServices,
    title: 'Services',
    className: 'services',
    url: urls[pages.dashboardServices],
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
