import React from 'react';
import {
    Row,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

import { saveGoal, getGoal, deleteGoal } from './GQMHelper';

class Goal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goal: '',
            goalId: -1,
            goalEntered: true,
            goalExist: false,
            email: JSON.parse(localStorage.getItem('innometrics-email')),
            userId: localStorage.getItem('user_id'),
        };

        this.handleGoalChange = this.handleGoalChange.bind(this);
    }

    loadData() {
        const promise = new Promise(() => { 
            this.getGoalData(localStorage.getItem('mr-token'), this.state.userId).catch(error => {
                console.error('An error occurred:', error)});
        });
        return promise
      }
     
    async componentDidMount(){
    this.loadData().catch(error => {
        console.error('An error occurred:', error);
    });
    }

    getGoalData = async (token, userId) => {
        await getGoal(token, userId)
            .then(data => {
                if (data && data.length !== 0) {
                    this.setState({ goal: data[0].content })
                    this.setState({ goalId: data[0].id })
                    this.props.setGoalId(data[0].id)
                    this.setState({ goalExist: true })
                }
                else (
                    this.props.setGoalId(-2)
                )
            });
    }

    handleGoalChange(event) {
        this.setState({ goal: event.target.value })
    }

    submitGoal = async () => {
        if (this.state.goal === '') {
            await this.setState({ goalEntered: false })
        } else {
            await saveGoal(this.state.token, this.state.goal, this.state.userId)
                .then(resp => {
                    this.setState({ goalId: resp.id })
                    this.props.setGoalId(resp.id)
                    this.setState({ goalExist: true })
                })
            await this.setState({ goalEntered: true })
        }
    }

    removeGoal = async () => {
        console.log(this.state.token);
        deleteGoal(localStorage.getItem('mr-token'), this.state.goalId)
        this.setState({ goal: '' })
        this.setState({ goalId: -1 })
        this.setState({ goalExist: false })
    }

    render() {
        return (
            <FormGroup className="mb-0">
                <Row className="mb-0">
                    <Col xs="2">
                        <Label htmlFor="goal" className="mt-3"><b>Goal: </b></Label>
                    </Col>

                    <Col className="pb-0 mt-2" xs="7">
                        {this.state.goalEntered ?
                            null : <p style={{ color: 'red' }}>You need to enter the goal!</p>
                        }
                        {this.state.goalExist ?
                            <p className="mt-2">{this.state.goal}</p>
                            :
                            <Input
                                className="mt-2"
                                type="text"
                                id="goal"
                                placeholder="Enter your goal"
                                onChange={this.handleGoalChange}
                                required
                            />
                        }
                    </Col>

                    <Col className="pb-0 mt-2" xs="3">
                        {this.state.goalExist ?
                            <button
                                type="button"
                                className="btn btn-primary p-1 mb-1"
                                onClick={this.removeGoal}
                            >Delete</button>
                            :
                            <button
                                type="button"
                                className="btn btn-primary p-1 mb-1"
                                onClick={this.submitGoal}
                            >Save</button>
                        }
                    </Col>
                </Row>
            </FormGroup>
        )
    }

}

export default Goal