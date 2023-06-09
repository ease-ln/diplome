import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
    move,
    reorder
} from '../utils'

import { getQuestions, getQuestionById, getMetrics, assignMetricsToQuestion } from './GQMHelper'
import Question from './Question'
import Metrics from './Metrics'

class DnD extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            questionsExtracted: false,

            question1: null,
            question1Items: [],

            question2: null,
            question2Items: [],

            question3: null,
            question3Items: [],

            bottomItems: [],
        };
    }

    id2List = {
        droppable: 'question1Items',
        droppable2: 'question2Items',
        droppable3: 'question3Items',
        droppable4: 'bottomItems',
    }

    loadData() {
        var promise = new Promise((resolve, reject) => { 
            this.getQuestionsData();
        });
        return promise
      }
     
    
    async componentDidMount(){
    this.loadData().catch(error => {
        console.error('An error occurred:', error);
    });
    }

    getQuestionsData = async () => {
        if (this.props.goalId !== -2) {
            await getQuestions(this.props.token, this.props.goalId)
                .then(data => {
                    if (data) {
                        if (data.length >= 1) {
                            this.setState({ question1: data[0] })
                        }
                        if (data.length >= 2) {
                            this.setState({ question2: data[1] })
                        }
                        if (data.length === 3) {
                            this.setState({ question3: data[2] })
                        }
                    }
                });
        }
        this.setState({ questionsExtracted: true })
        await this.getMetricsFromDb()
    }

    getMetricsFromDb = async () => {
        if (this.state.question1 !== null) {
            await getQuestionById(this.state.question1.id)
                .then(question => {
                    this.setState({ question1Items: question.metrics })
                })
        }
        if (this.state.question2 !== null) {
            await getQuestionById(this.state.question2.id)
                .then(question => {
                    this.setState({ question2Items: question.metrics })
                })
        }
        if (this.state.question3 !== null) {
            await getQuestionById(this.state.question3.id)
                .then(question => {
                    this.setState({ question3Items: question.metrics })
                })
        }

        await this.formListOfMetrics().catch((error) => {
            console.error("Error occurred while executing Promise:", error)
        });
    }

    formListOfMetrics = async () => {
        let metrics = await getMetrics()
        if (metrics && metrics.length) {
            let listOfMetrics = Array.from({ length: metrics.length }, (v, k) => k).map((k) => ({
                id: `${metrics[k].id}`,
                content: metrics[k].name,
            }))
            let cumulativeLength = await this.cumulativeLength()
            if (cumulativeLength === 0) {
                this.setState({ 'bottomItems': listOfMetrics })
            } else {
                let filteredMetricsList = this.filterMetrics(listOfMetrics, this.state.question1Items)
                filteredMetricsList = this.filterMetrics(filteredMetricsList, this.state.question2Items)
                filteredMetricsList = this.filterMetrics(filteredMetricsList, this.state.question3Items)
                this.setState({ 'bottomItems': filteredMetricsList })
            }
        }
    }

    cumulativeLength = async () => {
        let cumulativeLength = this.state.question1Items.length
        cumulativeLength += this.state.question2Items.length
        cumulativeLength += this.state.question3Items.length
        return cumulativeLength
    }

    filterMetrics = (listOfMetrics, questionMetrics) => {
        let result = listOfMetrics
        questionMetrics.forEach(qmetrics => {
            result = result.filter(lmetrics =>
                parseInt(lmetrics['id']) !== parseInt(qmetrics['id'])
            )
        })
        return result
    }

    onDragEnd = async (result) => {
        const { source, destination } = result
        // dropped outside the list
        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index,
            )

            let state = { items }

            if (source.droppableId === 'droppable2') {
                state = { question2Items: items }
            }

            if (source.droppableId === 'droppable3') {
                state = { question3Items: items }
            }

            if (source.droppableId === 'droppable4') {
                state = { bottomItems: items }
            }

            this.setState(state)
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination,
            )
            console.log('r', result)
            if (result.droppable) {
                this.setState({ question1Items: result.droppable })
                await this.saveMetricsForQuestion(result.droppable, this.state.question1.id)
            }
            if (result.droppable2) {
                
                this.setState({ question2Items: result.droppable2 })
                await this.saveMetricsForQuestion(result.droppable2, this.state.question2.id)
            }
            if (result.droppable3) {
                this.setState({ question3Items: result.droppable3 })
                await this.saveMetricsForQuestion(result.droppable3, this.state.question3.id)
            }
            if (result.droppable4) {
                this.setState({ bottomItems: result.droppable4 })
            }
        }
    }

    getList = (id) => this.state[this.id2List[id]]

    saveMetricsForQuestion = async (metrics, id) => {
        if (id !== null) {
            await assignMetricsToQuestion(metrics, id).catch((error) => {
                console.error("Error occurred while executing Promise:", error)
            });
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.questionsExtracted ?
                    <>
                        <Question
                            droppableId='droppable'
                            inputId='question1Items'
                            label='Question 1:'
                            goalId={this.props.goalId}
                            question={this.state.question1}
                            questionItems={this.state.question1Items}
                            setQuestionItems={(result) => this.onDragEnd(result)}
                        />

                        <Question
                            droppableId='droppable2'
                            inputId='question2Items'
                            label='Question 2:'
                            goalId={this.props.goalId}
                            question={this.state.question2}
                            questionItems={this.state.question2Items}
                            setQuestionItems={(result) => this.onDragEnd(result)}
                        />

                        <Question
                            droppableId='droppable3'
                            inputId='question3Items'
                            label='Question 3:'
                            goalId={this.props.goalId}
                            question={this.state.question3}
                            questionItems={this.state.question3Items}
                        />
                    </>
                    :
                    <span>Loading...</span>
                }

                <hr></hr>

                <Droppable droppableId="droppable4" direction="horizontal">
                    {(provided, snapshot) => (
                        <Metrics
                            provided={provided}
                            snapshot={snapshot}
                            questionItems={this.state.bottomItems}
                        />
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default DnD