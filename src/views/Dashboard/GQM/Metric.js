import React, { useState, useEffect } from 'react'

import Downshift from 'downshift'
import matchSorter from 'match-sorter'

import { Card, CardBody, CardHeader, Label, Alert, Spinner } from 'reactstrap'
import DatePicker from 'react-datepicker'
import CustomInput from '../CustomInput'
import UserSelect from '../UserSelect'
import WidgetNumber from '../../Widgets/WidgetNumber.js'

import { Line, Pie, HorizontalBar, Doughnut } from 'react-chartjs-2'

import DateOptions from './DateOptions'
import LineGraph from './LineGraph'
// import PieGraph from './PieGraph'

export default function Metric({
  name,
  type = 'line',
  userSelect = null,
  startAndEndDate = false,
  userRole = 'DEVELOPER',
  users = [],
  api = null,
  projectID,
  SQProject,
}) {
  const today = new Date()
  const [date, setDate] = useState(
    startAndEndDate
      ? new Date(today.setDate(today.getDate() - 30))
      : new Date(),
  )
  const [endDate, setEndDate] = useState(new Date())
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem('innometrics-email')),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [itemsToShow, setItemsToShow] = useState([])
  const [isChartLoading, setIsChartLoading] = useState(false)
  const [data, setData] = useState(null)
  const [options, setOptions] = useState(null)
  const [error, setError] = useState(null)

  function getItemsToShow(value) {
    return value
      ? matchSorter(users, value, {
        keys: ['email'],
      })
      : users
  }

  function handleStateChange(changes, downshiftState) {
    if (changes.hasOwnProperty('isOpen')) {
      var newOpen =
        changes.type === Downshift.stateChangeTypes.mouseUp
          ? newOpen
          : changes.isOpen

      if (newOpen) {
        setIsOpen(newOpen)
        setItemsToShow(getItemsToShow(downshiftState.inputValue))
      }
    } else if (changes.hasOwnProperty('inputValue')) {
      setItemsToShow(getItemsToShow(downshiftState.inputValue))
    }
  }

  function handleUserChange(selectedItem, downshiftState) {
    if (selectedItem && selectedItem.email) {
      setEmail(selectedItem.email)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    async function exec() {
      if (isMounted) setIsChartLoading(true)
      try {
        const apiData = await api(date, startAndEndDate ? endDate : date, email)
        if (isMounted) {
          setData(apiData.data)
          setOptions(apiData.options)
        }
      } catch (e) {
        console.error(e)
        setError('Something went wrong.')
      }
      setIsChartLoading(false)
    }

    exec()
    return () => {
      isMounted = false
    }
  }, [email, date, endDate, projectID, SQProject])

  const setDateOption = (startDate, endDate) => {
    setDate(startDate)
     setEndDate(endDate) 
  }
  const getCustomLabels = () =>{
    let customLabels = []
      data.labels.forEach((label, i) => {
        const val = new Date(data.datasets[0].data[i] * 1000).toISOString().substr(11, 8)
        customLabels.push(label + ': ' + val)
      })
    return customLabels
  }
  const check = [true, false]
  
  if (check[0]) {
    return (
      <>
        <Card>
          <CardHeader style={{height: '45px', padding: 0, margin: 0}}>         
            <div style={{
              display:"flex",
              justifyContent: 'space-between',
              height: '45px',
              backgroundColor: '#f0f3f5',
              alignContent: 'center',
              padding: '0 20px'
            }}>
              <p style={{
                margin: 0,
                alignSelf: 'center',
              }}>{name}</p>
              <DateOptions setOption={setDateOption} isRange={!!startAndEndDate} initialDate={date}/>
            </div>
          </CardHeader>
          <CardBody style={{
            maring: 0,
            padding: '5px',
            // height: type === 'pie' ? '220px' : 'unset',
          }}>
            <div
              style={{
                height: "250px",
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
            {error && !email ? (
                <Label>{error}</Label>
              ) : !data || isChartLoading ? (
                <Spinner animation="grow" variant="primary" />
              ) : data.labels.length === 0 ? (
                <Alert color="warning">No data.</Alert>
                  ) : type === 'line' ? (
                  <div style={{display:'block', width: '100%'}}>
                    {(data && options)  && <LineGraph data={data} options={options} startDate={date} endDate={endDate} />}
                  </div>
              ) : type === 'bar' ? (
                <HorizontalBar data={data} options={options} />
              ) : type === 'number' ? (
                <WidgetNumber
                  header={data.datasets[0].data[0]}
                  color="primary"
                  className="card-body-unset"
                />
              ) : (
                <Doughnut
                  data={{ ...data, labels: getCustomLabels() }}
                  options={[options, { legend: { position: 'right' }, responsive: true }]}
                  width={400}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </>
    )
  }
  if (check[1]) {
    return (
      <Card>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd/mm/yyyy"
          maxDate={new Date()}
          customInput={
            <CustomInput
              readOnly
              date={date}
              text={startAndEndDate ? 'Start date' : 'Date'}
            />
          }
        />

        {startAndEndDate && (
          <DatePicker
            selected={endDate}
            onChange={(d) => setEndDate(d)}
            dateFormat="dd/mm/yyyy"
            maxDate={new Date()}
            minDate={date}
            customInput={<CustomInput readOnly date={endDate} text="End date" />}
          />
        )}
        {userSelect && userRole !== 'DEVELOPER' && (
          <UserSelect
            onStateChange={handleStateChange}
            isOpen={isOpen}
            onChange={handleUserChange}
            items={itemsToShow}
            itemToString={itemToString}
          />
        )}

        <CardHeader>
          {name}
          <div className="card-header-actions"></div>
        </CardHeader>
        <CardBody>
          <div className="chart-wrapper" style={{ height: "250px" }}>
            {error && !email ? (
              <Label>{error}</Label>
            ) : !data || isChartLoading ? (
              <Spinner animation="grow" variant="primary" />
            ) : data.labels.length === 0 ? (
              <Alert color="warning">No data.</Alert>
            ) : type === 'line' ? (
              <Line data={data} options={options} />
            ) : type === 'bar' ? (
              <HorizontalBar data={data} options={options} />
            ) : type === 'number' ? (
              <WidgetNumber
                header={data.datasets[0].data[0]}
                color="primary"
                className="card-body-unset"
              />
            ) : (
              <Pie data={data} options={options} />
            )}
          </div>
        </CardBody>
      </Card>
    )
  }
}

function itemToString(i) {
  return i ? i.email : ''
}
