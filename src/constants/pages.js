// all pages that either have save button or they are in the sidebar
const pages = {
  dashboardBlocksList: 'DASHBOARD_BLOCKS_LIST',
  dashboardBlockCreate: 'DASHBOARD_BLOCK_CREATE',
  dashboardBlockManage: 'DASHBOARD_BLOCK_VIEW',
  dashboardHome: 'DASHBOARD_HOME',

  dashboardKintoAppsList: 'DASHBOARD_KINTO_APPS_LIST',
  dashboardKintoAppsCreate: 'DASHBOARD_KINTO_APPS_CREATE',
  dashboardKintoAppEnvironments: 'DASHBOARD_KINTO_APP_ENVIRONMENTS',
  dashboardKintoAppsManage: 'DASHBOARD_KINTO_APPS_MANAGE',

  dashboardAnalytics: 'DASHBOARD_ANALYTICS',
  dashboardSalesdata: 'DASHBOARD_SALESDATA',
  dashboardServices: 'DASHBOARD_SERVICES',

  dashboardSettings: 'DASHBOARD_SETTINGS',
  dashboardHosting: 'DASHBOARD_HOSTING',
  dashboardBilling: 'DASHBOARD_BILLING'
}

export const dashboardSidebar = [
  {
    key: pages.dashboardHome,
    title: 'Home',
    className: 'home',
    url: '/app/dashboard',
    group: 1
  },
  {
    title: 'Applications',
    className: 'kintoapps',
    url: '/app/dashboard/kintoapps/list',
    addUrl: '/app/dashboard/kintoapps/create',
    children: [
      {
        key: pages.dashboardKintoAppsList,
        url: '/app/dashboard/kintoapps/list'
      },
      {
        key: pages.dashboardKintoAppsManage,
        url: '/app/dashboard/kintoapps/:id/versions/:version'
      },
      {
        key: pages.dashboardKintoAppsCreate,
        url: '/app/dashboard/kintoapps/create'
      },
      {
        key: pages.dashboardKintoAppEnvironments,
        url: '/app/dashboard/kintoapps/:id/environments'
      }
    ],
    group: 1
  },
  {
    key: pages.dashboardAnalytics,
    title: 'Analytics',
    className: 'analytics',
    url: '/app/dashboard/analytics',
    group: 1
  },
  {
    title: 'KintoBlocks',
    className: 'kintoblocks',
    url: '/app/dashboard/kintoblocks/list',
    addUrl: '/app/dashboard/kintoblocks/create',
    children: [
      {
        key: pages.dashboardBlocksList,
        url: '/app/dashboard/kintoblocks/list'
      },
      {
        key: pages.dashboardBlockManage,
        url: '/app/dashboard/kintoblocks/:id/versions/:version'
      },
      {
        key: pages.dashboardBlockCreate,
        url: '/app/dashboard/kintoblocks/create'
      }
    ],
    group: 1
  },
  {
    key: pages.dashboardSalesdata,
    title: 'Sales Data',
    className: 'sales-data',
    url: '/app/dashboard/salesdata',
    group: 1
  },
  {
    key: pages.dashboardServices,
    title: 'Services',
    className: 'services',
    url: '/app/dashboard/services',
    group: 1
  },
  {
    key: pages.dashboardSettings,
    title: 'App Settings',
    className: 'settings',
    url: '/app/dashboard/settings',
    group: 2
  },
  {
    key: pages.dashboardHosting,
    title: 'Hosting',
    className: 'hosting',
    url: '/app/dashboard/hosting',
    group: 2
  },
  {
    key: pages.dashboardBilling,
    title: 'Account Billing',
    className: 'billing',
    url: '/app/dashboard/billing',
    group: 2
  }
]

export const marketSidebar = []

export default pages
