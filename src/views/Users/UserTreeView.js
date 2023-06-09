import React from 'react'
import OrgChart from '@unicef/react-org-chart'

import avatarPersonnel from './avatar-personnel.svg'
import orgIcon from './collaboration.svg'
import projectIcon from './projector-screen.svg'

function getRoot() {
  return {
    id: 100,
    person: {
      id: 100,
      avatar: orgIcon,
      department: '',
      name: 'Innometrics',
      title: 'Organization',
    },
    hasChild: true,
    hasParent: false,
    children: [],
  }
}

function getOrgs(projects) {
  let orgs = []
  projects.forEach((p) => {
    orgs.push({
      id: p.projectID,
      person: {
        id: p.projectID,
        name:
          p.name.split('_').length > 1 ? p.name.split('_').join(' ') : p.name,
        avatar: projectIcon,
        department: '',
        title: '',
        totalReports: 0,
      },
      hasChild: true,
      hasParent: true,
    })
  })
  return orgs
}

function getPeople(users) {
  let ppl = []
  users.forEach((p, idx) => {
    ppl.push({
      id: idx + 1000,
      person: {
        id: idx + 1000,
        name: `${p.name} ${p.surname}`,
        avatar: avatarPersonnel,
        department: '',
        title: p.role,
        totalReports: 0,
      },
      hasChild: true,
      hasParent: true,
    })
  })
  return ppl
}

export default class UserTreeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: getRoot(),
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
      usersPerProject: {},
    }
  }

  fetchUsers(projectId) {
    const url = `https://innometric.guru:9091/V1/Admin/Users?ProjectId=${projectId}`
    const token = JSON.parse(
      localStorage.getItem('https://innometric.guru-innometric:9091'),
    ).token
    const headers = {Token: token, Accept: 'application/json'}
    return fetch(url, {
      method: 'GET',
      headers,
    }).then((r) => r.json())
  }

  componentDidMount() {
    // eslint-disable-next-line array-callback-return
    this.props.projects.map((pr) => {
      this.fetchUsers(pr.projectID).then((res) => {
        this.setState({
          usersPerProject: {
            ...this.state.usersPerProject,
            [pr.projectID]: res.userList,
          },
        })
      }).catch(error => {
        console.error('An error occurred:', error);
    });
    })
  }

  getChild = (id) => {
    const projectIds = this.props.projects.map((p) => p.projectID)

    if (id === 100) return getOrgs(this.props.projects)
    if (projectIds.includes(id))
      return getPeople(this.state.usersPerProject[id])
  }

  getParent = (d) => {
    const projectIds = this.props.projects.map((p) => p.projectID)
    if (projectIds.includes(d.id)) return 100
  }

  handleDownload = () => {
    this.setState({downloadingChart: false})
  }

  handleOnChangeConfig = (config) => {
    this.setState({config: config})
  }

  handleLoadConfig = () => {
    const {config} = this.state
    return config
  }

  render() {
    const {tree} = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      <React.Fragment>
        <OrgChart
          tree={tree}
          downloadImageId={downloadImageId}
          downloadPdfId={downloadPdfId}
          onConfigChange={(config) => {
            this.handleOnChangeConfig(config)
          }}
          loadConfig={(d) => {
            let configuration = this.handleLoadConfig(d)
            if (configuration) {
              return configuration
            }
          }}
          loadImage={(d) => {
            if (d.id >= 1000) return Promise.resolve(avatarPersonnel)
            if (d.id === 100) return Promise.resolve(orgIcon)
            else return Promise.resolve(projectIcon)
          }}
          loadParent={(d) => {
            const parentData = this.getParent(d)
            return parentData
          }}
          loadChildren={(d) => {
            const childrenData = this.getChild(d.id)
            return childrenData
          }}
        />
      </React.Fragment>
    )
  }
}
