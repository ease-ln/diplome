import React from 'react'
import { Row, Col, Label, Input } from 'reactstrap'
import { Droppable } from 'react-beautiful-dnd';

import { saveQuestion, deleteQuestion } from './GQMHelper'
import Metrics from './Metrics'

class Question extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            question: '',
            questionId: -1,
            questionEntered: true,
            questionExist: false,
            token: localStorage.getItem('mr-token'),
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        this.setQuestionData();
    }

    setQuestionData = () => {
        if (this.props.question != null) {
            this.setState({ question: this.props.question.content })
            this.setState({ questionId: this.props.question.id })
            this.setState({ questionExist: true })
        }
    }

    handleChange(event) {
        this.setState({ question: event.target.value });
    }

    submitQuestion = async () => {
        if (this.state.question === '') {
            await this.setState({ questionEntered: false })
        } else {
            await saveQuestion(this.state.token, this.state.question, this.props.goalId)
                .then(resp => {
                    this.setState({ questionId: resp.questionId })
                    this.setState({ questionExist: true })
                })
            await this.setState({ questionEntered: true })
        }
    }

    removeQuestion = async () => {
        deleteQuestion( this.state.token, this.state.questionId)
        this.setState({ question: '' })
        this.setState({ gquestionId: -1 })
        this.setState({ questionExist: false })
        this.props.setQuestionItems({
            source: { index: 0, droppableId: this.props.droppableId },
            destination: { droppableId: "droppable4", index: 0 }
        })
    }

    render() {
        return (
            <Droppable droppableId={this.props.droppableId} direction="horizontal">
                {(provided, snapshot) => (
                    <>
                        <Row className="mt-0">
                            <Col xs="2">
                                <Label className="mt-3"><b>{this.props.label}</b></Label>
                            </Col>

                            <Col className="pb-0 mt-2" xs="7">
                                {this.state.questionEntered ?
                                    null :
                                    <p className="mt-2" style={{ color: 'red' }}>
                                        You need to enter the question!
                                    </p>
                                }
                                {this.state.questionExist ?
                                    <p className="mt-2">{this.state.question}</p>
                                    :
                                    <Input
                                        type="text"
                                        id={this.props.inputId}
                                        placeholder="Enter your question"
                                        onChange={this.handleChange}
                                        required
                                    />
                                }
                            </Col>

                            <Col className="pb-0 mt-2" xs="3">
                                {this.state.questionExist ?
                                    <button
                                        type="button"
                                        className="btn btn-primary p-1 mb-1"
                                        onClick={this.removeQuestion}
                                    >Delete</button>
                                    :
                                    <button
                                        type="button"
                                        className="btn btn-primary pb-1 pt-1 pr-2 mb-1"
                                        onClick={this.submitQuestion}
                                    >Save</button>
                                }
                            </Col>
                        </Row>
                        <Metrics
                            provided={provided}
                            snapshot={snapshot}
                            questionItems={this.props.questionItems}
                        />
                    </>
                )}
            </Droppable>
        )
    }
}

export default Question