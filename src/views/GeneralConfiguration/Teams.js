import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input, CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class Teams extends Component {
  state = {
    projectID:''
  }

  handleChange = (k) => (e) => {
    //const key = k.toLowerCase()
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
  goToMembers = () => {
    this.props.history.push(this.props.history.location.pathname + '/members')
  }
  goToExternalProjectxTeams = () => {
    this.props.history.push(this.props.history.location.pathname + '/extprojxteams')
  }
  save = async () => {
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isactive"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "updateby")continue
      if(v === "createdby")continue
      if(v === "lastupdate")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    const company_id = this.props.match.params.id1
    try{
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.putTeam(token, id, payload)()
      await actionCreator.fetchTeams(token, company_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const url = `/company/${company_id}/teams`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const company_id = this.props.match.params.id1
    try{
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.deleteTeam(token, id)()
      await actionCreator.fetchTeams(token, company_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const url = `/company/${company_id}/teams/`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.getTeam(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.team).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
    await actionCreator.fetchProjects(token)(this.props.dispatch)
  }
  render() {
    const {isactive, creationdate, companyid, projectID, teamid, createdby, lastupdate, updateby, ...agentStateData} = this.state
    const projects = this.props.projects
    //const teamid = this.props.match.params.id2
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Team's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Team id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="teamid"
                        disabled
                        value={teamid}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Company id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="companyid"
                        disabled
                        value={companyid}
                      />
                    </td>
                  </tr>
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
                      Creation Date
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="creationdate"
                        disabled
                        value={creationdate===null ? "" : new Date(creationdate).toDateString()}
                        onChange={this.handleChange("creationdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Created By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="createdby"
                        disabled
                        value={createdby===null ? "" : createdby}
                        onChange={this.handleChange("createdby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Last Update
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="lastupdate"
                        disabled
                        value={lastupdate===null ? "" : new Date(lastupdate).toDateString()}
                        onChange={this.handleChange("lastupdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Updated By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="updatedby"
                        disabled
                        value={updateby===null ? "" : updateby}
                        onChange={this.handleChange("updatedby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Is Active
                    </td>
                    <td>
                      <CustomInput
                        id="isactive"
                        type="switch"
                        name="isactive"
                        checked={isactive}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.save}>
                    Save
                  </Button>
                  <Button color="danger" onClick={this.remove}>
                    Delete
                  </Button>
                  <Button color="secondary" onClick={this.goToExternalProjectxTeams}>
                    Go to External Project x Teams
                  </Button>
                  <Button color="secondary" onClick={this.goToMembers}>
                    Go to Members
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
  connect((state) => ({
    team: fromJS(state.configuration.get('team')).toJS(),
    projects: fromJS(state.configuration.get('projects')).toJS()
  }))(Teams),
)
