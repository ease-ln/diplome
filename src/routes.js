import React from 'react'

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/Base/Cards'))
const Carousels = React.lazy(() => import('./views/Base/Carousels'))
const Collapses = React.lazy(() => import('./views/Base/Collapses'))
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'))
const Forms = React.lazy(() => import('./views/Base/Forms'))
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'))
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'))
const Navbars = React.lazy(() => import('./views/Base/Navbars'))
const Navs = React.lazy(() => import('./views/Base/Navs'))
const Paginations = React.lazy(() => import('./views/Base/Paginations'))
const Popovers = React.lazy(() => import('./views/Base/Popovers'))
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'))
const Switches = React.lazy(() => import('./views/Base/Switches'))
const Tables = React.lazy(() => import('./views/Base/Tables'))
const Tabs = React.lazy(() => import('./views/Base/Tabs'))
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'))
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'))
const ButtonDropdowns = React.lazy(() =>
  import('./views/Buttons/ButtonDropdowns'),
)
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'))
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'))
const Charts = React.lazy(() => import('./views/Charts'))
// const Dashboard = React.lazy(() => import('./views/Dashboard'))
const NewDashboard = React.lazy(() => import('./views/NewDashboard'))
const Settings = React.lazy(() => import('./views/Settings'))
const Control = React.lazy(() => import('./views/Control'))
const GQMConfig = React.lazy(() => import('./views/GQMConfig'))
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/Icons/Flags'))
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'))
const SimpleLineIcons = React.lazy(() =>
  import('./views/Icons/SimpleLineIcons'),
)
const Agent = React.lazy(() => import('./views/Agent/Agent'))
const AgentMenu = React.lazy(()=> import('./views/Agent/Menu'))
const CreateAgent = React.lazy(()=> import("./views/Agent/CreateNewAgent"))
const CreateConfigDetails = React.lazy(()=> import("./views/Agent/CreateConfigDetails"))
const CreateConfigMethods = React.lazy(()=> import("./views/Agent/CreateConfigMethods"))
const CreateResponseConfig = React.lazy(()=> import("./views/Agent/CreateResponseConfig"))
const ConfigDetails = React.lazy(()=> import("./views/Agent/ConfigDetails"))
const ConfigMethods = React.lazy(()=> import("./views/Agent/ConfigMethods"))
const ResponseConfig = React.lazy(()=> import("./views/Agent/ResponseConfig"))
const MenuMethods = React.lazy(()=> import("./views/Agent/MenuMethods"))
const MenuDetails = React.lazy(()=> import("./views/Agent/MenuDetails"))
const MenuResponses = React.lazy(()=> import("./views/Agent/MenuResponses"))

const Alerts = React.lazy(() => import('./views/Notifications/Alerts'))
const Badges = React.lazy(() => import('./views/Notifications/Badges'))
const Modals = React.lazy(() => import('./views/Notifications/Modals'))
const Colors = React.lazy(() => import('./views/Theme/Colors'))
const Typography = React.lazy(() => import('./views/Theme/Typography'))
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'))
const Users = React.lazy(() => import('./views/Users/Users'))
const User = React.lazy(() => import('./views/Users/User'))

const Company = React.lazy(() => import('./views/GeneralConfiguration/Company'))
const CreateCompany = React.lazy(() => import('./views/GeneralConfiguration/CreateCompany'))
const MenuCompany = React.lazy(()=>import('./views/GeneralConfiguration/MenuCompany'))
const Members = React.lazy(() => import('./views/GeneralConfiguration/Members'))
const CreateMembers = React.lazy(() => import('./views/GeneralConfiguration/CreateMembers'))
const MenuMembers = React.lazy(() => import('./views/GeneralConfiguration/MenuMembers'))
const Teams = React.lazy(() => import('./views/GeneralConfiguration/Teams'))
const CreateTeams = React.lazy(() => import('./views/GeneralConfiguration/CreateTeams'))
const MenuTeams = React.lazy(() => import('./views/GeneralConfiguration/MenuTeams'))
const AgentsxCompany = React.lazy(() => import('./views/GeneralConfiguration/AgentsxCompany'))
const CreateAgentsxCompany = React.lazy(() => import('./views/GeneralConfiguration/CreateAgentsxCompany'))
const MenuAgentsxCompany = React.lazy(() => import('./views/GeneralConfiguration/MenuAgxCom'))
const ExternalProjectxTeam = React.lazy(() => import('./views/GeneralConfiguration/ExternalProjectxTeam'))
const CreateExternalProjectxTeam = React.lazy(() => import('./views/GeneralConfiguration/CreateExtProjxTeam'))
const MenuExternalProjectxTeam = React.lazy(() => import('./views/GeneralConfiguration/MenuExtProjxTeam'))

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: NewDashboard},
  {path: '/settings', name: 'Settings', exact: true, component: Settings},
  {
    path: '/settings/success',
    name: 'Settings Success',
    exact: true,
    component: Settings,
  },
  {path: '/control', name: 'Data Control', exact: true, component: Control},
  {path: '/agentMenu', name: "Agent's Control", exact: true, component: AgentMenu},
  {path: '/agent/create', name: 'Create New Agent', exact: true, component: CreateAgent},
  {path: '/agent/:id(\\d+)', name: 'Agent', exact: true, component: Agent},
  {path: '/agent/:id(\\d+)/methods', name: 'Menu Config Methods', exact: true, component: MenuMethods},
  {path: '/agent/:id(\\d+)/methods/create', name: 'Create Config Methods', exact: true, component: CreateConfigMethods},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)', name: 'Config Methods', exact: true, component: ConfigMethods},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/details', name: 'Menu Config Details', exact: true, component: MenuDetails},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/details/create', name: 'Create Config Details', exact: true, component: CreateConfigDetails},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/details/:id3(\\d+)', name: 'Config Details', exact: true, component: ConfigDetails},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/responses', name: 'Menu Config Responses', exact: true, component: MenuResponses},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/responses/create', name: 'Create Response Config', exact: true, component: CreateResponseConfig},
  {path: '/agent/:id(\\d+)/methods/:id2(\\d+)/responses/:id3(\\d+)', name: 'Response Config', exact: true, component: ResponseConfig},
  {path: '/company', name: 'Companies', exact: true, component: MenuCompany},
  {path: '/company/:id1(\\d+)', name: 'Company', exact: true, component: Company},
  {path: '/company/create', name: 'Create Company', exact: true, component: CreateCompany},
  {path: '/company/:id1(\\d+)/agxcom', name: 'Agents x Companies', exact: true, component: MenuAgentsxCompany},
  {path: '/company/:id1(\\d+)/agxcom/:id2(\\d+)', name: 'Agent x Company', exact: true, component: AgentsxCompany},
  {path: '/company/:id1(\\d+)/agxcom/create', name: 'Create Agent x Company', exact: true, component: CreateAgentsxCompany},
  {path: '/company/:id1(\\d+)/teams', name: 'Teams', exact: true, component: MenuTeams},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)', name: 'Team', exact: true, component: Teams},
  {path: '/company/:id1(\\d+)/teams/create', name: 'Create Team', exact: true, component: CreateTeams},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/members', name: 'Members', exact: true, component: MenuMembers},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/members/:id3(\\d+)', name: 'Member', exact: true, component: Members},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/members/create', name: 'Create Member', exact: true, component: CreateMembers},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/extprojxteams', name: 'External Projects x Teams', exact: true, component: MenuExternalProjectxTeam},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/extprojxteams/:id3(\\d+)', name: 'External Project x Team', exact: true, component: ExternalProjectxTeam},
  {path: '/company/:id1(\\d+)/teams/:id2(\\d+)/extprojxteams/create', name: 'Create External Projects x Teams', exact: true, component: CreateExternalProjectxTeam},
  {path: '/gqm', name: 'GQM Config', exact: true, component: GQMConfig},
  {path: '/theme', exact: true, name: 'Theme', component: Colors},
  {path: '/theme/colors', name: 'Colors', component: Colors},
  {path: '/theme/typography', name: 'Typography', component: Typography},
  {path: '/base', exact: true, name: 'Base', component: Cards},
  {path: '/base/cards', name: 'Cards', component: Cards},
  {path: '/base/forms', name: 'Forms', component: Forms},
  {path: '/base/switches', name: 'Switches', component: Switches},
  {path: '/base/tables', name: 'Tables', component: Tables},
  {path: '/base/tabs', name: 'Tabs', component: Tabs},
  {path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs},
  {path: '/base/carousels', name: 'Carousel', component: Carousels},
  {path: '/base/collapses', name: 'Collapse', component: Collapses},
  {path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns},
  {path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons},
  {path: '/base/list-groups', name: 'List Groups', component: ListGroups},
  {path: '/base/navbars', name: 'Navbars', component: Navbars},
  {path: '/base/navs', name: 'Navs', component: Navs},
  {path: '/base/paginations', name: 'Paginations', component: Paginations},
  {path: '/base/popovers', name: 'Popovers', component: Popovers},
  {path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar},
  {path: '/base/tooltips', name: 'Tooltips', component: Tooltips},
  {path: '/buttons', exact: true, name: 'Buttons', component: Buttons},
  {path: '/buttons/buttons', name: 'Buttons', component: Buttons},
  {
    path: '/buttons/button-dropdowns',
    name: 'Button Dropdowns',
    component: ButtonDropdowns,
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    component: ButtonGroups,
  },
  {
    path: '/buttons/brand-buttons',
    name: 'Brand Buttons',
    component: BrandButtons,
  },
  {path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons},
  {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons},
  {path: '/icons/flags', name: 'Flags', component: Flags},
  {path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome},
  {
    path: '/icons/simple-line-icons',
    name: 'Simple Line Icons',
    component: SimpleLineIcons,
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Notifications',
    component: Alerts,
  },
  {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
  {path: '/notifications/badges', name: 'Badges', component: Badges},
  {path: '/notifications/modals', name: 'Modals', component: Modals},
  {path: '/widgets', name: 'Widgets', component: Widgets},
  {path: '/charts', name: 'Charts', component: Charts},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  {path: '/me', exact: true, name: 'My Details', component: User},
]

export default routes
