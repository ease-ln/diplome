import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import './Dashboard.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { getPieData, getPieOptions } from './PieHelper.js'
import { getLineData, getLineOptions } from './TimeHelper.js'
import { getNumberData, getNumberOptions } from './NumberHelper.js'
import { getCumulLineData, getCumulLineOpts } from './CumulHelper.js'
import { getBarData, getBarOptions } from './BarHelper'
import {
  timeChartData,
  numOfClasses,
  LOC,
  codeCoverage,
  thirdChartData,
  activitiesChartData,
  categoryChartData,
  fetchAgentsList,
  fetchSQProjectList,
} from '../../redux/common/flows.js'
import {
  groupByApp,
  groupByDate,
  gropByCategory,
  cumulteHourly,
} from './DashboardHelper.js'

import GQMWrapper from './GQM/GQMWrapper'
import { getGoal, getQuestions, getQuestionById } from '../GQMConfig/GQM/GQMHelper'
import generateMetricsList from './MetricsHelper'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDropdownOpen: false,
      projectSelected: {
        projectID: null,
      },
      SQProjectDropdownOpen: false,
      allSQProjects: [],
      SQProjectSelected: null,
      email: JSON.parse(localStorage.getItem('innometrics-email')),
      goal: {
        content: null,
        id: null
      },

      question1: null,
      question1Items: [],

      question2: null,
      question2Items: [],

      question3: null,
      question3Items: []
    }
  }

  today = new Date()


  componentDidMount() {
    this.projectMapPropsToState()
  }

  projectMapPropsToState = async () => {
    if (
      this.props.projects.length > 0 &&
      !this.state.projectSelected.projectID
    ) {
      var projectId = this.props.projects[0]
      this.setProject(projectId)
    }
    this.getGQMdata()
  }

  getGQMdata = async () => {
    await this.getGoalData()
    await this.getQuestionsData()
    await this.getMetricsLists()
  }

  getGoalData = async () => {
    await getGoal(this.state.token, localStorage.getItem('user_id'))
      .then(data => {
        if (data.length !== 0) {
          this.setState({
            goal: {
              content: data[0].content,
              id: data[0].id
            }
          })
        }
      });
  }

  getQuestionsData = async () => {
    if (this.state.goalId) {
      await getQuestions(this.state.goalId)
        .then(data => {
          if (data) {
            if (data.questions.length >= 1) {
              this.setState({ question1: data.questions[0] })
            }
            if (data.questions.length >= 2) {
              this.setState({ question2: data.questions[1] })
            }
            if (data.questions.length === 3) {
              this.setState({ question3: data.questions[2] })
            }
          }
        });
    }
  }

  getMetricsLists = async () => {
    if (this.state.question1 !== null) {
      await getQuestionById(this.state.question1.id)
        .then(question => {
          let newList = generateMetricsList(
            question.metrics,
            this.timeReturn,
            this.activityReturn,
            this.cumulReturn,
            this.categoryReturn,
            this.numOfClassesReturn,
            this.LOCReturn,
            this.CodeCoverageReturn
          )
          this.setState({ question1Items: newList })
        })
    }
    if (this.state.question2 !== null) {
      await getQuestionById(this.state.question2.id)
        .then(question => {
          let newList = generateMetricsList(
            question.metrics,
            this.timeReturn,
            this.activityReturn,
            this.cumulReturn,
            this.categoryReturn,
            this.numOfClassesReturn,
            this.LOCReturn,
            this.CodeCoverageReturn
          )
          this.setState({ question2Items: newList })
        })
    }
    if (this.state.question3 !== null) {
      await getQuestionById(this.state.question3.id)
        .then(question => {
          let newList = generateMetricsList(
            question.metrics,
            this.timeReturn,
            this.activityReturn,
            this.cumulReturn,
            this.categoryReturn,
            this.numOfClassesReturn,
            this.LOCReturn,
            this.CodeCoverageReturn
          )
          this.setState({ question3Items: newList })
        })
    }
  }

  SQProjectsMapToState = async (projectId) => {
    if (this.state.SQProjectSelected == null) {
      console.log(projectId)
      let data = await fetchAgentsList(projectId)
      if (data.agentList[4].isconnected === 'Y') {
        let list = await fetchSQProjectList(projectId)
        let newArr = []
        for (let el of list.projectList) {
          if (el.isconnected === 'Y') {
            newArr.push(el)
          }
        }
        this.setSQProject(newArr[0])
        this.setState({ allSQProjects: newArr })
      }
    }
  }

  // for time chart
  timeReturn = async (date, endDate) => {
    const timeByDate = await this.getTimeReportData(date, endDate)
    if (timeByDate) return Dashboard.returnLineData(timeByDate)
    return null
  }

  async getTimeReportData(date, endDate) {
    const r = await this.props.fetchTimeFlow(
      date,
      endDate,
      this.state.projectSelected.projectID,
    )
    return groupByDate(r.report)
  }

  // for cumulative (app hourly chart)
  cumulReturn = async (date, endDate, user) => {
    const fromCumulData = await this.getCumulReportData(date, endDate, user)
    if (fromCumulData && fromCumulData.hours && fromCumulData.apps) {
      const { hours, apps } = fromCumulData
      const cumulData = getCumulLineData(hours, apps)
      const cumulOpts = getCumulLineOpts()

      if (cumulData && cumulOpts)
        return {
          data: cumulData,
          options: cumulOpts,
        }
    }
    return { data: { labels: [] } }
  }

  async getCumulReportData(date, endDate, user) {
    const r = await this.props.fetchThirdFlow(
      user,
      date,
      date,
      this.state.projectSelected.projectID,
    )
    return cumulteHourly(r.activityReports)
  }

  // for activity chart
  activityReturn = async (date, endDate) => {
    const timeByApp = await this.getActivityReportData(date, endDate)
    return Dashboard.returnPieData(timeByApp)
  }

  async getActivityReportData(date, endDate) {
    const act = await this.props.fetchActivitiesFlow(
      date,
      endDate,
      this.state.projectSelected.projectID,
    )
    return groupByApp(act.report)
  }

  // for category report
  categoryReturn = async (date, endDate) => {
    const fromCatData = await this.getCategoryReportData(date, endDate)
    const catData = getBarData(fromCatData)
    const catOpts = getBarOptions()
    return { data: catData, options: catOpts }
  }

  async getCategoryReportData(date, endDate) {
    const r = await this.props.fetchCategoryFlow(
      date,
      endDate,
      this.state.projectSelected.projectID,
    )
    return gropByCategory(r.report)
  }

  // SQ Number of classes
  numOfClassesReturn = async () => {
    await this.SQProjectsMapToState(this.state.projectSelected.projectID)
    const size = await this.getNumOfClasses()
    if (size.length) {
      return Dashboard.returnNumber(size[0].classes)
    }
    return Dashboard.returnNumber(`¯\\_(ツ)_/¯`)
  }

  async getNumOfClasses() {
    const r = await this.props.fetchNumOfClasses(
      this.state.projectSelected.projectID,
      this.state.SQProjectSelected.projectName
    )
    return r.reports[0].sizeandcomplexities
  }

  LOCReturn = async () => {
    await this.SQProjectsMapToState(this.state.projectSelected.projectID)
    const size = await this.getLOC()
    if (size.length) {
      return Dashboard.returnNumber(size[0].lines)
    }
    return Dashboard.returnNumber(`¯\\_(ツ)_/¯`)
  }

  async getLOC() {
    const r = await this.props.fetchLOC(
      this.state.projectSelected.projectID,
      this.state.SQProjectSelected.projectName
    )
    return r.reports[0].sizeandcomplexities
  }

  CodeCoverageReturn = async () => {
    await this.SQProjectsMapToState(this.state.projectSelected.projectID)
    const coverages = await this.getCodeCoverage()
    if (coverages.length) {
      return Dashboard.returnNumber(coverages[0].coverage)
    }
    return Dashboard.returnNumber(`¯\\_(ツ)_/¯`)
  }

  async getCodeCoverage() {
    const r = await this.props.fetchCodeCoverage(
      this.state.projectSelected.projectID,
      this.state.SQProjectSelected.projectName
    )
    return r.reports[0].coverages
  }

  static returnPieData = (timeByApp) => {
    const pieData = getPieData(timeByApp)
    const pieOptions = getPieOptions()
    return {
      data: pieData,
      options: pieOptions,
    }
  }

  static returnLineData = (timeByDate) => {
    const timeData = getLineData(timeByDate)
    const timeOpts = getLineOptions()
    return {
      data: timeData,
      options: timeOpts,
    }
  }

  static returnNumber = (number) => {
    const timeData = getNumberData(number)
    const timeOpts = getNumberOptions()
    return {
      data: timeData,
      options: timeOpts,
    }
  }

  static returnBarData = () => { }

  projectDropdownToggle = () =>
    this.setState({
      projectDropdownOpen: !this.state.projectDropdownOpen,
    })

  setProject = async (p) => this.setState({ projectSelected: p })

  SQProjectDropdownToggle = () =>
    this.setState({
      SQProjectDropdownOpen: !this.state.SQProjectDropdownOpen,
    })

  setSQProject = async (p) => {
    await this.setState({ SQProjectSelected: p })
  }

  someFunc = async (p) => {
    await this.setSQProject(p)
    this.numOfClassesReturn()
    this.LOCReturn()
    this.CodeCoverageReturn()
  }

  Loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  )

  render() {
    return (
      <div className="animated fadeIn table-responsive">
        <Dropdown
          isOpen={this.state.projectDropdownOpen}
          toggle={this.projectDropdownToggle}
          style={{ marginBottom: '0.7rem', display: 'inline-block' }}
        >
          <DropdownToggle caret color="light">
            {this.state.projectSelected
              ? this.state.projectSelected.name
              : 'Project select'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Projects</DropdownItem>
            {this.props.projects.map((p) => (
              <DropdownItem key={p.name} onClick={() => this.setProject(p)}>
                {p.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          isOpen={this.state.SQProjectDropdownOpen}
          toggle={this.SQProjectDropdownToggle}
          style={{ marginBottom: '0.7rem', marginLeft: '1rem', display: 'inline-block' }}
        >
          <DropdownToggle caret color="light">
            {this.state.SQProjectSelected
              ? this.state.SQProjectSelected.projectName
              : 'Component select'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Components</DropdownItem>
            {this.state.allSQProjects.map((p) => (
              <DropdownItem key={p.projectName} onClick={() => {
                this.someFunc(p)
              }}>
                {p.projectName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <GQMWrapper
          goal={
            this.state.goal.id ?
              this.state.goal.content :
              "You did not set up the GQM model, so you will see the default settings"
          }
          questions={[
            {
              name: this.state.question1 ?
                this.state.question1.content :
                'What is the Overall Time Spent?',
              metrics: this.state.question1Items.length ?
                this.state.question1Items :
                [
                  {
                    id: 0,
                    name: 'Accumulated Total Time Spent',
                    type: 'line',
                    userSelectEnabled: false,
                    withEndDate: true,
                    api: this.timeReturn,
                  },

                  {
                    id: 1,
                    name: 'Accumulated Activities',
                    type: 'pie',
                    userSelectEnabled: false,
                    withEndDate: true,
                    api: this.activityReturn,
                  },
                ],
            },

            {
              name: this.state.question2 ?
                this.state.question2.content :
                'What Type of Apps do Users Mostly Use?',
              metrics: this.state.question2Items.length ?
                this.state.question2Items :
                [
                  {
                    id: 2,
                    name: 'Top 5 Apps Per Person Daily',
                    type: 'line',
                    userSelectEnabled: true,
                    withEndDate: false,
                    api: this.cumulReturn,
                  },
                  {
                    id: 3,
                    name: 'Category Chart',
                    type: 'bar',
                    userSelectEnabled: false,
                    withEndDate: true,
                    api: this.categoryReturn,
                  },
                ],
            },

            {
              name: this.state.question3 ?
                this.state.question3.content :
                'What is the Overall Code Quality?',
              metrics: this.state.question3Items.length ?
                this.state.question3Items :
                [
                  {
                    id: 4,
                    name: 'SonarQube Number of Classes',
                    type: 'number',
                    userSelectEnabled: false,
                    withEndDate: false,
                    api: this.numOfClassesReturn,
                  },

                  {
                    id: 5,
                    name: 'SonarQube LOC',
                    type: 'number',
                    userSelectEnabled: false,
                    withEndDate: false,
                    api: this.LOCReturn,
                  },

                  {
                    id: 6,
                    name: 'SonarQube Code Coverage',
                    type: 'number',
                    userSelectEnabled: false,
                    withEndDate: false,
                    api: this.CodeCoverageReturn,
                  }
                ],
            },
          ]}
          userRole={this.props.role}
          users={this.props.users}
          projectID={this.state.projectSelected.projectID}
          SQProject={this.state.SQProjectSelected}
        />
      </div >
    )
  }
}

export default connect(
  (state) => ({
    users: fromJS(state.users.get('users')).toJS(),
    activities: fromJS(state.report.get('activities')).toJS(),
    timeReport: fromJS(state.report.get('time')).toJS(),
    cumulReport: fromJS(state.report.get('cumul')).toJS(),
    activitiesLastFetched: fromJS(state.report.get('lastFetched')),
    projects: fromJS(state.projects.get('projects')).toJS(),
    role: fromJS(state.roles.get('role')),
  }),
  (dispatch) => ({
    fetchThirdFlow: (email, date = new Date(), endDate, projectId) =>
      dispatch(thirdChartData(email, date, endDate, projectId)),
    fetchTimeFlow: (date = new Date(), endDate, projectId) =>
      dispatch(timeChartData(date, endDate, projectId)),
    fetchNumOfClasses: (projectId, SQProjectId) =>
      dispatch(numOfClasses(projectId, SQProjectId)),
    fetchLOC: (projectId, SQProjectId) =>
      dispatch(LOC(projectId, SQProjectId)),
    fetchCodeCoverage: (projectId, SQProjectId) =>
      dispatch(codeCoverage(projectId, SQProjectId)),
    fetchActivitiesFlow: (date = new Date(), endDate, projectId) =>
      dispatch(activitiesChartData(date, endDate, projectId)),
    fetchCategoryFlow: (date = new Date(), endDate, projectId) =>
      dispatch(categoryChartData(date, endDate, projectId)),
  }),
)(Dashboard)
