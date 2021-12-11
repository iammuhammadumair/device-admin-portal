export const delay = 2000
export const disableTimersAndAnimations = false

export const minimal = [
  {
    name: 'Homepage',
    category: 'LAYOUTS',
    path: '/',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.landing-page-wrapper',
    displayOrder: 110,
  },
  {
    name: 'Hero Left',
    category: 'MARKETING',
    path: '/marketing-1',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.landing-page-wrapper',
    displayOrder: 0,
  },
  {
    name: 'Hero Right',
    category: 'MARKETING',
    path: '/marketing-2',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.landing-page-wrapper',
    displayOrder: 10,
  },
  {
    name: 'Hero Centered',
    category: 'MARKETING',
    path: '/marketing-3',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.landing-page-wrapper',
    displayOrder: 20,
  },
  {
    name: 'Messaging V2',
    category: 'APP',
    path: '/messaging-v2',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.chat-app-wrapper',
    displayOrder: 40,
  },
  {
    name: 'Status',
    category: 'UTILITY',
    path: '/status',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.status-page-wrapper',
    displayOrder: 60,
  },
  {
    name: 'Wizard V1 (step 1)',
    category: 'APP',
    path: '/wizard-v1',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 50,
  },
  {
    name: 'Wizard V1 (step 2)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 2,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 51,
  },
  {
    name: 'Wizard V1 (step 3)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 3,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 52,
  },
  {
    name: 'Wizard V1 (step 4)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 4,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 53,
  },
  {
    name: 'Wizard V1 (step 5)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 5,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 54,
  },
  {
    name: 'Wizard V1 (step 6)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 6,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 55,
  },
  {
    name: 'Wizard V1 (step 7)',
    category: 'APP',
    path: '/wizard-v1',
    query: {
      step: 7,
    },
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.wizard-v1-wrapper',
    displayOrder: 56,
  },
  {
    name: 'Inbox',
    category: 'APP',
    path: '/inbox',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.inbox-wrapper',
    displayOrder: 30,
  },
  {
    name: 'Error 1',
    category: 'UTILITY',
    path: '/error/page-1',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.error-container',
    displayOrder: 70,
  },
  {
    name: 'Error 2',
    category: 'UTILITY',
    path: '/error/page-2',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.error-container',
    displayOrder: 120,
  },
  {
    name: 'Error 3',
    category: 'UTILITY',
    path: '/error/page-3',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.error-container',
    displayOrder: 80,
  },
  {
    name: 'Error 4',
    category: 'UTILITY',
    path: '/error/page-4',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.error-container',
    displayOrder: 90,
  },
  {
    name: 'Error 5',
    category: 'UTILITY',
    path: '/error/page-5',
    prefix: 'minimal',
    pageDelay: 300,
    checkVisibleSelector: '.error-container',
    displayOrder: 100,
  },
]

export const auth = [
  {
    name: 'Login 1',
    category: 'AUTHENTICATION',
    path: '/auth/login-1',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.modern-login',
    displayOrder: 0,
  },
  {
    name: 'Login 2',
    category: 'AUTHENTICATION',
    path: '/auth/login-2',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.auth-wrapper-inner',
    displayOrder: 10,
  },
  {
    name: 'Login 3',
    category: 'AUTHENTICATION',
    path: '/auth/login-3',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.auth-wrapper-inner',
    displayOrder: 20,
  },
  {
    name: 'Signup 1',
    category: 'AUTHENTICATION',
    path: '/auth/signup-1',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.signup-wrapper',
    displayOrder: 30,
  },
  {
    name: 'Signup 2',
    category: 'AUTHENTICATION',
    path: '/auth/signup-2',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.auth-wrapper-inner',
    displayOrder: 40,
  },
  {
    name: 'Signup 3',
    category: 'AUTHENTICATION',
    path: '/auth/signup-3',
    prefix: 'auth',
    pageDelay: 300,
    checkVisibleSelector: '.auth-wrapper-inner',
    displayOrder: 50,
  },
]

const layouts = [
  {
    name: 'Action Page V1',
    category: 'LAYOUTS',
    path: '/action-page-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 590,
  },
  {
    name: 'Action Page V2',
    category: 'LAYOUTS',
    path: '/action-page-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 600,
  },
  {
    name: 'Form V1',
    category: 'FORMS',
    path: '/form-layouts-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 360,
  },
  {
    name: 'Form V2',
    category: 'FORMS',
    path: '/form-layouts-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 370,
  },
  {
    name: 'Form V3',
    category: 'FORMS',
    path: '/form-layouts-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 380,
  },
  {
    name: 'Form V4',
    category: 'FORMS',
    path: '/form-layouts-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 390,
  },
  {
    name: 'Form V5',
    category: 'FORMS',
    path: '/form-layouts-5',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 395,
  },
  {
    name: 'Grid Card V1',
    category: 'LAYOUTS',
    path: '/grid-cards-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 400,
  },
  {
    name: 'Grid Card V2',
    category: 'LAYOUTS',
    path: '/grid-cards-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 410,
  },
  {
    name: 'Grid Card V3',
    category: 'LAYOUTS',
    path: '/grid-cards-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 420,
  },
  {
    name: 'Grid Card V4',
    category: 'LAYOUTS',
    path: '/grid-cards-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 430,
  },
  {
    name: 'Grid Tiles V1',
    category: 'LAYOUTS',
    path: '/grid-tiles-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 440,
  },
  {
    name: 'Grid Tiles V2',
    category: 'LAYOUTS',
    path: '/grid-tiles-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 450,
  },
  {
    name: 'Grid Tiles V3',
    category: 'LAYOUTS',
    path: '/grid-tiles-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 460,
  },
  {
    name: 'Grid Users V1',
    category: 'LAYOUTS',
    path: '/grid-users-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 470,
  },
  {
    name: 'Grid Users V2',
    category: 'LAYOUTS',
    path: '/grid-users-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 480,
  },
  {
    name: 'Grid Users V3',
    category: 'LAYOUTS',
    path: '/grid-users-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 490,
  },
  {
    name: 'Grid Users V4',
    category: 'LAYOUTS',
    path: '/grid-users-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 500,
  },
  {
    name: 'Onboarding Standard',
    category: 'LAYOUTS',
    path: '/onboarding-welcome',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 320,
  },
  {
    name: 'Kanban Board',
    category: 'LAYOUTS',
    path: '/kanban-board',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 650,
  },
  {
    name: 'List Datatable V1',
    category: 'LAYOUTS',
    path: '/list-datatable-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 320,
  },
  {
    name: 'List Datatable V2',
    category: 'LAYOUTS',
    path: '/list-datatable-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 330,
  },
  {
    name: 'List Datatable V3',
    category: 'LAYOUTS',
    path: '/list-datatable-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 340,
  },
  {
    name: 'List Datatable V4',
    category: 'LAYOUTS',
    path: '/list-datatable-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 350,
  },
  {
    name: 'List Flex V1',
    category: 'LAYOUTS',
    path: '/list-flex-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 290,
  },
  {
    name: 'List Flex V2',
    category: 'LAYOUTS',
    path: '/list-flex-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 300,
  },
  {
    name: 'List Flex V3',
    category: 'LAYOUTS',
    path: '/list-flex-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 310,
  },
  {
    name: 'Homepage (List View V1)',
    category: 'LAYOUTS',
    path: '/',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 250,
  },
  {
    name: 'List View V2',
    category: 'LAYOUTS',
    path: '/list-view-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 260,
  },
  {
    name: 'List View V3',
    category: 'LAYOUTS',
    path: '/list-view-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 270,
  },
  {
    name: 'List View V4',
    category: 'LAYOUTS',
    path: '/list-view-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 280,
  },
  {
    name: 'Onboarding Page V1',
    category: 'LAYOUTS',
    path: '/onboarding-page-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 700,
  },
  {
    name: 'Onboarding Page V2',
    category: 'LAYOUTS',
    path: '/onboarding-page-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 710,
  },
  {
    name: 'Onboarding Page V3',
    category: 'LAYOUTS',
    path: '/onboarding-page-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 720,
  },
  {
    name: 'Onboarding Page V4',
    category: 'LAYOUTS',
    path: '/onboarding-page-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 730,
  },
  {
    name: 'Onboarding Page V5',
    category: 'LAYOUTS',
    path: '/onboarding-page-5',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 740,
  },
  {
    name: 'Profile Edit',
    category: 'LAYOUTS',
    path: '/profile-edit',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 520,
  },
  {
    name: 'Profile Edit Experience',
    category: 'LAYOUTS',
    path: '/profile-edit/experience',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 530,
  },
  {
    name: 'Profile Edit Skills',
    category: 'LAYOUTS',
    path: '/profile-edit/skills',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 540,
  },
  {
    name: 'Profile Edit Settings',
    category: 'LAYOUTS',
    path: '/profile-edit/settings',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 550,
  },
  {
    name: 'Profile Notifications',
    category: 'LAYOUTS',
    path: '/profile-notifications',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 270,
  },
  {
    name: 'Profile Settings',
    category: 'LAYOUTS',
    path: '/profile-settings',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 280,
  },
  {
    name: 'Profile View',
    category: 'LAYOUTS',
    path: '/profile-view',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 510,
  },
  {
    name: 'Projects Details',
    category: 'LAYOUTS',
    path: '/projects-details',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 640,
  },
  {
    name: 'Projects List V1',
    category: 'LAYOUTS',
    path: '/projects-projects-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 600,
  },
  {
    name: 'Projects List V2',
    category: 'LAYOUTS',
    path: '/projects-projects-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 610,
  },
  {
    name: 'Projects List V3',
    category: 'LAYOUTS',
    path: '/projects-projects-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 620,
  },
  {
    name: 'SaaS Billing',
    category: 'LAYOUTS',
    path: '/saas-billing',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 580,
  },
  {
    name: 'Search Empty',
    category: 'LAYOUTS',
    path: '/search-empty',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 570,
  },
  {
    name: 'Search Results',
    category: 'LAYOUTS',
    path: '/search-results',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 560,
  },
  {
    name: 'Account Confirm',
    category: 'UTILITY',
    path: '/utility-account-confirm',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 660,
  },
  {
    name: 'Invoice',
    category: 'UTILITY',
    path: '/utility-invoice',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 680,
  },
  {
    name: 'Promotion',
    category: 'UTILITY',
    path: '/utility-promotion',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 670,
  },
  {
    name: 'Placeload List',
    category: 'UTILITY',
    path: '/placeload-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 750,
    new: true,
  },
  {
    name: 'Placeload Table',
    category: 'UTILITY',
    path: '/placeload-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 760,
    new: true,
  },
  {
    name: 'Placeload Grid',
    category: 'UTILITY',
    path: '/placeload-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 770,
    new: true,
  },
  {
    name: 'Placeload Tiles',
    category: 'UTILITY',
    path: '/placeload-4',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 780,
    new: true,
  },
]

const dashboards = [
  {
    name: 'Food Delivery',
    category: 'APP',
    path: '/food-delivery',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 200,
  },
  {
    name: 'Banking V1',
    category: 'DASHBOARD',
    path: '/banking-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 70,
  },
  {
    name: 'Banking V2',
    category: 'DASHBOARD',
    path: '/banking-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 80,
  },
  {
    name: 'Banking V3',
    category: 'DASHBOARD',
    path: '/banking-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 90,
  },
  {
    name: 'Flights',
    category: 'DASHBOARD',
    path: '/flights',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 100,
  },
  {
    name: 'Company',
    category: 'DASHBOARD',
    path: '/company',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 110,
  },
  {
    name: 'Human Ressources',
    category: 'DASHBOARD',
    path: '/human-ressources',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 120,
  },
  {
    name: 'Course Dashboard',
    category: 'DASHBOARD',
    path: '/course',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 130,
  },
  {
    name: 'Jobs Dashboard',
    category: 'DASHBOARD',
    path: '/jobs',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 131,
  },
  {
    name: 'Charts Apex',
    category: 'DASHBOARD',
    path: '/charts-apex',
    pageDelay: 400,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 220,
  },
  {
    name: 'Charts BillboardsJS',
    category: 'DASHBOARD',
    path: '/charts-billboardsjs',
    pageDelay: 400,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 230,
  },
  {
    name: 'Ecommerce V1',
    category: 'DASHBOARD',
    path: '/ecommerce-1',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 190,
  },
  {
    name: 'Analytics',
    category: 'DASHBOARD',
    path: '/analytics',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 40,
  },
  {
    name: 'Stocks',
    category: 'DASHBOARD',
    path: '/stocks',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 50,
  },
  {
    name: 'Sales',
    category: 'DASHBOARD',
    path: '/sales',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 60,
  },
  {
    name: 'Influencer',
    category: 'DASHBOARD',
    path: '/influencer',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 140,
  },
  {
    name: 'Hobbies',
    category: 'DASHBOARD',
    path: '/hobbies',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 150,
  },
  {
    name: 'Health',
    category: 'DASHBOARD',
    path: '/health',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 160,
  },
  {
    name: 'Writer',
    category: 'DASHBOARD',
    path: '/writer',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 170,
  },
  {
    name: 'Video',
    category: 'DASHBOARD',
    path: '/video',
    pageDelay: 2000,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 180,
  },
  {
    name: 'Soccer league',
    category: 'DASHBOARD',
    path: '/soccer',
    new: true,
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 181,
  },
  {
    name: 'Homepage (Personal V1)',
    category: 'DASHBOARD',
    path: '/',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 0,
  },
  {
    name: 'Personal V2',
    category: 'DASHBOARD',
    path: '/personal-2',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 10,
  },
  {
    name: 'Personal V3',
    category: 'DASHBOARD',
    path: '/personal-3',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 20,
  },
  {
    name: 'Widgets Creative',
    category: 'DASHBOARD',
    path: '/widgets-sample-creative',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 250,
  },
  {
    name: 'Widgets List',
    category: 'DASHBOARD',
    path: '/widgets-sample-list',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 260,
  },
  {
    name: 'Widgets Stats',
    category: 'DASHBOARD',
    path: '/widgets-sample-stats',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 270,
  },
  {
    name: 'Widgets UI',
    category: 'DASHBOARD',
    path: '/widgets-sample-ui',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 240,
  },
]

export const sidebar = [
  {
    name: 'Messaging V1',
    category: 'APP',
    path: '/messaging-v1',
    prefix: 'sidebar',
    pageDelay: 300,
    checkVisibleSelector: '#vuero-messaging',
    auth: false,
    displayOrder: 210,
  },
  {
    name: 'Maps V1',
    category: 'APP',
    path: '/sidebar/maps-1',
    prefix: 'sidebar',
    new: true,
    pageDelay: 4000,
    checkVisibleSelector: '.dashboard-map-wrapper',
    auth: false,
    displayOrder: 211,
  },
  {
    name: 'Maps V2',
    category: 'APP',
    path: '/sidebar/maps-2',
    prefix: 'sidebar',
    new: true,
    pageDelay: 4000,
    checkVisibleSelector: '.dashboard-map-wrapper',
    auth: false,
    displayOrder: 212,
  },
  ...layouts.map((item) => {
    return {
      ...item,
      path: `/sidebar/layouts${item.path}`,
      prefix: 'sidebar',
      auth: false,
    }
  }),
  ...dashboards.map((item) => {
    return {
      ...item,
      path: `/sidebar/dashboards${item.path}`,
      prefix: 'sidebar',
      auth: true,
    }
  }),
]

export const navbar = [
  {
    name: 'Maps V1',
    category: 'APP',
    path: '/navbar/maps-1',
    prefix: 'navbar',
    new: true,
    auth: false,
    pageDelay: 300,
    checkVisibleSelector: '.dashboard-map-wrapper',
    displayOrder: 211,
  },
  {
    name: 'Maps V2',
    category: 'APP',
    path: '/navbar/maps-2',
    prefix: 'navbar',
    new: true,
    auth: false,
    pageDelay: 300,
    checkVisibleSelector: '.dashboard-map-wrapper',
    displayOrder: 212,
  },
  ...layouts.map((item) => {
    return {
      ...item,
      path: `/navbar/layouts${item.path}`,
      prefix: 'navbar',
      auth: false,
    }
  }),
  ...dashboards.map((item) => {
    return {
      ...item,
      path: `/navbar/dashboards${item.path}`,
      prefix: 'navbar',
      auth: true,
    }
  }),
]

export const templates = [
  {
    name: 'Regular Sidebar',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-1',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 0,
  },
  {
    name: 'Curved Sidebar',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-2',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 10,
  },
  {
    name: 'Colored Sidebar',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-3',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 20,
  },
  {
    name: 'Curved Colored Sidebar',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-4',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 30,
  },
  {
    name: 'Sidebar Labels',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-5',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 40,
  },
  {
    name: 'Hover Labels',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-6',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 50,
  },
  {
    name: 'Floating Sidebar',
    category: 'TEMPLATES',
    path: '/sidebar-blank-page-7',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 60,
  },
  {
    name: 'Standard Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-1',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 70,
  },
  {
    name: 'Fading Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-2',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 80,
  },
  {
    name: 'Colored Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-3',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 90,
  },
  {
    name: 'Dropdown Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-4',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 100,
  },
  {
    name: 'Colored Dropdown Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-5',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 110,
  },
  {
    name: 'Clean Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-6',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 120,
  },
  {
    name: 'Clean Centered Navbar',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-7',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 130,
  },
  {
    name: 'Clean Transparent',
    category: 'TEMPLATES',
    path: '/navbar-blank-page-8',
    prefix: 'templates',
    pageDelay: 300,
    checkVisibleSelector: '.page-content-inner',
    displayOrder: 140,
  },
]