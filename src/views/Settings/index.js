import React, {Component} from 'react'
import classNames from 'classnames'
import {withRouter} from 'react-router-dom'

import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'

import {
  oauthFlow,
  refetchAgents,
  fetchProjectList,
  connectProjectFlow,
} from '../../redux/common/flows'

class AgentTile extends Component {
  state = {
    projectList: [],
    modalOpen: true,
    connectProjectLoading: false,
  }

  connectAgent = (e) => {
    const {agent, projects, selectedProject} = this.props
    if (!agent || !projects) return
    const projectId = selectedProject.projectID
    const cb = `${window.location.origin.toString()}/settings/success`
    return this.props.connectOauthAgent(agent.agentid, projectId, cb)
  }

  obtainData = async (e) => {
    this.setState({
      connectionResult: null,
    })
    const {agent, projects, fetchProjectList, selectedProject} = this.props
    if (!agent || !projects) return
    const projectId = selectedProject.projectID
    const response = await fetchProjectList(agent.agentid, projectId)
    this.setState(
      {
        projectList: response.projectList,
      },
      () => {
        if (!this.state.modalOpen) {
          this.toggle()
        }
      },
    )
  }

  connectProjectHandler = (repoRef) => async (e) => {
    const {agent, projects, selectedProject} = this.props
    if (!agent || !projects) return
    this.setState({
      connectProjectLoading: true,
    })
    const response = await connectProjectFlow(
      agent.agentid,
      selectedProject.projectID,
      repoRef,
    )
    let newState = {
      connectProjectLoading: false,
    }
    newState.connectionResult = response
    if (response.error) {
      newState.connectionResult = false
    }
    this.setState(newState)
  }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  render() {
    const {className, children, agent} = this.props
    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="2" sm="4" xs="6" className="mb-4">
        <Modal
          isOpen={
            this.state.projectList &&
            this.state.projectList.length > 0 &&
            this.state.modalOpen
          }
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            List of projects fetched successfully.
          </ModalHeader>
          <ModalBody>
            {this.state.connectionResult &&
            this.state.connectionResult === true ? (
              <Alert color="success">
                You have successfully integrated a project.
              </Alert>
            ) : (
              this.state.connectionResult === false && (
                <Alert color="danger">
                  There was an error trying to connect this project.
                </Alert>
              )
            )}

            <p style={{paddingBottom: '1rem'}}>
              Here's the list of projects within the {agent.agentname}:
            </p>
            <br />
            <ul
              style={{display: 'flex', flexDirection: 'column', width: '100%'}}
            >
              {this.state.projectList &&
                this.state.projectList.map((p) => (
                  <li
                    key={p.reference}
                    style={{
                      marginBottom: '0.5rem',
                      width: '100%',
                      display: 'flex',
                    }}
                  >
                    <p style={{flex: 1}}>{p.projectName}</p>
                    <Button
                      color="info"
                      style={{flex: 1}}
                      onClick={this.connectProjectHandler(p.reference)}
                      disabled={p.isconnected === 'Y'}
                    >
                      {p.isconnected === 'Y' ? 'Connected' : 'Connect Project'}
                    </Button>
                  </li>
                ))}
            </ul>

            {this.state.connectProjectLoading && (
              <>
                <p>Please wait until project is conneted...</p>
                <Spinner animation="grow" />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <div className={classes} style={{paddingTop: '75%'}}></div>
        <div>{children}</div>
        {agent.isconnected === 'Y' ? (
          <Button color="dark" onClick={this.obtainData}>
            See projects
          </Button>
        ) : (
          <Button color="primary" onClick={this.connectAgent}>
            Integrate
          </Button>
        )}
      </Col>
    )
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.projectDropdownToggle = this.projectDropdownToggle.bind(this)
  }

  state = {
    modalOpen: true,
    agents: [],
    projectDropdownOpen: false,
    projectSelected: {
      projectID: null,
    },
  }

  componentDidMount() {
    this.projectMapPropsToState()
  }

  projectMapPropsToState = () => {
    if (
      this.props.projects.length > 0 &&
      !this.state.projectSelected.projectID
    ) {
      this.setProject(this.props.projects[0])
    }
  }

  projectDropdownToggle = () =>
    this.setState({
      projectDropdownOpen: !this.state.projectDropdownOpen,
    })
  setProject = (p) => this.setState({projectSelected: p})

  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  modalToggle = () => {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.projectSelected !== prevState.projectSelected) {
      // refetch
      this.props
        .refetchAgents(this.state.projectSelected.projectID)
        .then((ag) => {
          this.setState({
            agents: ag.agentList,
          })
        })
    }
  }

  render() {
    const {pathname} = this.props.location
    const path = pathname.split('/').filter((x) => !!x)
    return (
      <div className="animated fadeIn">
        <Modal
          isOpen={this.state.modalOpen && path[1] && path[1] === 'success'}
          toggle={this.modalToggle}
          className={'modal-info ' + this.props.className}
        >
          <ModalHeader toggle={this.modalToggle}>
            Integration successful.
          </ModalHeader>
          <ModalBody>Successfully integrated an agent.</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.modalToggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Dropdown
          isOpen={this.state.projectDropdownOpen}
          toggle={this.projectDropdownToggle}
          style={{marginBottom: '0.7rem'}}
        >
          <DropdownToggle caret color="light">
            {this.state.projectSelected
              ? this.state.projectSelected.name
              : 'Project select'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Projects</DropdownItem>
            {this.props.projects &&
              this.props.projects.map((p) => (
                <DropdownItem key={p.name} onClick={() => this.setProject(p)}>
                  {p.name}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>

        <div className="card">
          <div className="card-header">
            <i className="icon-layers" /> Environment Settings
          </div>
          <div className="card-body">
            <Row>
              {!this.state.agents ? (
                <Alert color="danger">
                  There has been an error whilst connecting to the agent server.
                  Please check with a person responsible on where an error might
                  have occured.
                </Alert>
              ) : this.state.agents.length === 0 ? (
                <p>Loading...</p>
              ) : (
                this.state.agents &&
                this.state.agents.map((agent, idx) => (
                  <AgentTile
                    key={idx}
                    agent={agent}
                    projects={this.props.projects}
                    connectOauthAgent={this.props.connectOauthAgent}
                    fetchProjectList={this.props.fetchProjectList}
                    selectedProject={this.state.projectSelected}
                    className={
                      agent.isconnected === 'N' ? 'bg-danger' : 'bg-success'
                    }
                  >
                    {agent.agentname}
                  </AgentTile>
                ))
              )}
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({
      projects: fromJS(state.projects.get('projects')).toJS(),
    }),
    (dispatch) => ({
      connectOauthAgent: (agentId, projectId, cb) =>
        dispatch(oauthFlow(agentId, projectId, cb)),
      refetchAgents: (projectId) => dispatch(refetchAgents(projectId)),
      fetchProjectList: (agentId, projectId) =>
        dispatch(fetchProjectList(agentId, projectId)),
    }),
  )(Settings),
)
