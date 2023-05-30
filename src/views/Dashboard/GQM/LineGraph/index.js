import React, {memo} from 'react'
import Chart from 'react-apexcharts'
import {preprocessData }from './preprocessData'
import { Alert } from 'reactstrap'

const LineGraph = ({ data, options, startDate, endDate }) => {

	let graphData
	const isDate = options.scales.xAxes[0].scaleLabel.labelString === 'Date'
	if (isDate) {
		graphData = preprocessData(data, startDate, endDate)
	} else {
		let tempOptions = []
		data.datasets.forEach((item) => {
			tempOptions.push(
				{
					name: item.label,
					data: item.data
				}
			)
		})
		graphData = {
			labels: data.labels,
			allOptions: tempOptions,
		}
	}
	
	const chartData = {
		options: {
			chart: {
				id: isDate ? "area-graph" : "line",
				// height: '200px',
				// width: '200px'
			},
			dataLabels: {
				enabled: isDate,
				formatter: isDate && function (val, opts) {
					return val !== 0 ? val + 's' : undefined
				},
			},
			xaxis: {
				type: isDate ? 'datetime' : 'category',
				// tickAmount: 6,
				tooltip: {
					enabled: false,
				},
				labels: {
					style: {
						fontSize: '10px',
						colors: '#8F8F8F',
					},
				},
				categories: graphData.labels
			},
			tooltip:{
				x: {
					format: 'dd MMM',
					formatter: undefined,
				},
				y: {
					formatter: function (val, opts) {
						return val ? `${new Date(val * 1000).toISOString().substr(11, 8)}` : undefined
					},
				},
			},
			stroke: {
				width: 3
			},
			markers: {
				size: isDate ? 0 : 4,
			},
			// legend: {position: 'left'}
		},
		series: graphData.allOptions
	}
	if (graphData.allOptions.length === 1 && graphData.allOptions[0].data.reduce((a, b) => a + b, 0) === 0) {
		return (
			<Alert color="warning">No data.</Alert>
		)
	}
	return (
		<>
			<Chart
				options={chartData.options}
				series={chartData.series}
				// type='area'
				height='240px'
			/>
		</>
	)
}
export default memo(LineGraph)