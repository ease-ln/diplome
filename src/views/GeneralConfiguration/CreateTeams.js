import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {fromJS} from "immutable";

class CreateTeams extends Component {
  state = {
    isactive: false,
    teamname: '',
    projectID: '',
    description: '',
  }

  handleChange = (k) => (e) => {
    this.setState({[k]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }
  handleSelect = (e) => {
    const key = "projectID"
    this.setState({[key]: e.target.value})
  }
  Create = async () => {
    const id = this.props.match.params.id1
    const payload = {
      companyid: id,
      ...(this.state)
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try{
      const token = getData(localStorageKey).token
      await actionCreator.postTeam(token, payload)()
      await actionCreator.fetchTeams(token, id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      this.props.history.push(`/company/${id}/teams`)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    await actionCreator.fetchProjects(token)(this.props.dispatch)
  }
  render() {
    const {isactive, projectID, ...agentStateData} = this.state
    const projects = this.props.projects
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create Team Config
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  {Object.keys(agentStateData).map(
                    (k) => (
                      <tr key={k}>
                        <td>{`${k}:`}</td>
                        <td>
                          <Input
                            type="text"
                            name={k}
                            value={agentStateData[k]}
                            onChange={this.handleChange(k)}
                          />
                        </td>
                      </tr>
                    ),
                  )}
                  <tr>
                    <td>Projects</td>
                    <td>
                      <Input type="select" name="select" value={projectID} onChange={this.handleSelect}>
                        {projects.map((project)=>(
                          <option value={project.projectID}>{project.name}</option>
                        ))}
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      isActive
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isactive"
                        value={isactive}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.Create}>
                    Create
                  </Button>
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(
  connect((state)=>({
    projects: fromJS(state.configuration.get('projects')).toJS()
  }))(CreateTeams),
)
