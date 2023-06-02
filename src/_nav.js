// import data from "../src/assets"
import { getAgentSystem } from "./AgentSystem";

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-people',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
    },
    {
      name: 'Data Control',
      url: '/control',
      icon: 'icon-shield',
    },
    {
      name: "Companies",
      url: '/company',
      // icon: { img: { src: '../src/assets/img/brand/dataflow.svg'} },
      icon: 'icon-wrench',
      // badge: {
      //   variant: 'success',
      //   text: 'NEW',
      // },
    },
    {
      name: "Integrations",
      url: '/agentMenu',
      icon: 'icon-speech',
    },
    {
      name: 'GQM Config',
      url: 'gqm',
      icon: 'icon-question',
    },
    {
      name: 'Data Collector',
      url: getAgentSystem(),
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'info',
      attributes: {target: '_blank', rel: 'noopener'},
    },
  ],
}