import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Alert,
  Button,
} from 'reactstrap'

import DatePicker from 'react-datepicker'

import CustomInput from '../NewDashboard/Helpers/CustomInput'

import {
  fetchIndividualActivities,
  deleteActivities,
} from '../../redux/common/flows'

import './Control.scss'
import 'react-datepicker/dist/react-datepicker.css'

const dateOpts = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

const SelectedCheckbox = ({checked, handleChange}) => (
  <input type="checkbox" checked={checked} onChange={handleChange} />
)

class DataControl extends Component {
  state = {
    date: new Date(),
    activities: null,
    loading: false,
    selectedActivities: [],
  }

  componentDidMount() {
    this.setActivities()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      this.setActivities()
    }
  }

  setActivities = (date) => {
    this.setState({loading: true})
    this.props.fetchActivities(this.state.date).then((act) => {
      this.setState(
        {
          activities: act.report,
        },
        () => this.setState({loading: false}),
      )
    })
  }

  handleDateChange = (d) => this.setState({date: d})

  checkboxChange = (id) => (e) => {
    const {checked} = e.target
    if (checked) {
      this.setState({
        selectedActivities: this.state.selectedActivities.concat([id]),
      })
    } else {
      this.setState({
        selectedActivities: this.state.selectedActivities.filter(
          (x) => x !== id,
        ),
      })
    }
  }

  deleteActivities = () => {
    this.props.deleteActivities(this.state.selectedActivities).then((r) => {
      this.setState(
        {
          selectedActivities: [],
        },
        () => {
          this.setActivities()
        },
      )
    })
  }

  render() {
    return (
      <>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleDateChange}
          dateFormat="dd/mm/yyyy"
          maxDate={new Date()}
          customInput={
            <CustomInput readOnly date={this.state.date} text="Date" />
          }
        />
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <div>
                      <i className="fa fa-align-justify" /> All activities
                    </div>
                    {this.state.selectedActivities.length > 0 && (
                      <Button color="danger" onClick={this.deleteActivities}>
                        Delete
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  {this.state.loading && <Alert color="info">Loading...</Alert>}
                  {this.state.activities &&
                  this.state.activities.length === 0 ? (
                    <Alert color="secondary">
                      No activities for the selected date.
                    </Alert>
                  ) : (
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Idle?</th>
                          <th>End Time</th>
                          <th>Browser Title</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.activities &&
                          this.state.activities.length > 0 &&
                          this.state.activities.map((a) => (
                            <tr key={a.activityID}>
                              <td>{a.activityID}</td>
                              <td>{a.executable_name}</td>
                              <td>
                                {a.idle_activity ? (
                                  <Badge color="error">Yes</Badge>
                                ) : (
                                  <Badge color="success">No</Badge>
                                )}
                              </td>
                              <td>
                                {new Date(a.end_time).toLocaleDateString(
                                  undefined,
                                  dateOpts,
                                )}
                              </td>
                              <td>
                                {a.browser_title ? a.browser_title : 'N/A'}
                              </td>
                              <td>
                                <SelectedCheckbox
                                  checked={this.state.selectedActivities.includes(
                                    a.activityID,
                                  )}
                                  handleChange={this.checkboxChange(
                                    a.activityID,
                                  )}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({}),
    (dispatch) => ({
      fetchActivities: (date = new Date()) =>
        dispatch(fetchIndividualActivities(date)),
      deleteActivities: (ids) => dispatch(deleteActivities(ids)),
    }),
  )(DataControl),
)
