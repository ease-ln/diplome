import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input,
  Button,
  Label,
} from 'reactstrap'
import sizeMe from 'react-sizeme'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'

import UserTreeView from './UserTreeView'

import {createUserFlow} from '../../redux/common/flows'

import './Users.scss'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Y' ? 'success' : status === 'N' ? 'secondary' : 'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        <Link to={userLink}>{user.id}</Link>
      </th>
      <td>
        <Link to={userLink}>
          {user.name} {user.surname}
        </Link>
      </td>
      <td>{user.email}</td>
      <td>
        <Link to={userLink}>
          <Badge color={getBadge(user.isactive)}>
            {user.isactive ? 'Active' : 'Inactive'}
          </Badge>
        </Link>
      </td>
    </tr>
  )
}

class Users extends Component {
  state = {
    email: '',
    name: '',
    telegram: '',
  }

  submit = () => {
    const {email, name, telegram} = this.state
    createUserFlow(email, name, telegram).then((r) => {
      console.log(r)
    })
  }

  render() {
    const userList = this.props.users.map((u, i) => ({...u, id: i}))
    const {email, name, telegram} = this.state
    // const {width} = this.props.size
    const treeView = true

    return (
      <div className="animated fadeIn">
        <Row>
          {this.props.role === 'ADMIN' && (
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> User Management{' '}
                </CardHeader>
                <CardBody>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter an email"
                    required
                    value={email}
                    onChange={(e) => this.setState({email: e.target.value})}
                    style={{marginBottom: '0.5rem'}}
                  />
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter a name"
                    required
                    value={name}
                    onChange={(e) => this.setState({name: e.target.value})}
                    style={{marginBottom: '0.5rem'}}
                  />
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    type="text"
                    id="telegram"
                    name="telegram"
                    placeholder="Enter their telegram alias"
                    required
                    value={telegram}
                    onChange={(e) => this.setState({telegram: e.target.value})}
                    style={{marginBottom: '1rem'}}
                  />
                  <Button color="primary" onClick={this.submit}>
                    Create User
                  </Button>
                </CardBody>
              </Card>
            </Col>
          )}
          {!treeView ? (
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Users{' '}
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((user, index) => (
                        <UserRow key={index} user={user} />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Users{' '}
                </CardHeader>
                <CardBody style={{height: 1000}}>
                  <UserTreeView
                    users={userList}
                    projects={this.props.projects}
                  />
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

export default sizeMe()(
  connect((state) => ({
    users: fromJS(state.users.get('users')).toJS(),
    role: fromJS(state.roles.get('role')),
    projects: fromJS(state.projects.get('projects')).toJS(),
  }))(Users),
)
