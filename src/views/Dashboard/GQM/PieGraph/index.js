import React, {memo} from 'react'
import Chart from 'react-apexcharts'
// import {preprocessData }from './preprocessData'
// import getOptions from './options'
// import { Alert } from 'reactstrap'
const PieGraph = ({ data }) => {
	
	// const graphData = preprocessData(data)

	const addTimeToLegend = (index) => {
		console.log(data, index)
		const time = data.datasets[0].data[index]
		return `: ${new Date(time * 1000).toISOString().substr(11, 8)}`
	}
	const chartData = {
      series: data.datasets[0].data,
		
	   options: {
              chart: {
                width: 380,
                type: 'pie',
              },
		   labels: data.labels.map((val, i) => {
			   const newVal = val + addTimeToLegend(i);
			   return newVal
		   }),
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
					  position: 'right',
                  }
                }
		   }],
		},
	   
	}
	// if (graphData.allOptions.reduce((a, b) => a + b, 0) === 0) {
	// 	return (
	// 		<Alert color="warning">No data.</Alert>
	// 	)
	// }
	return (
		<>
			<Chart
				options={chartData.options}
				series={chartData.series}
				type='donut'
			/>
		</>
	)
}
export default memo(PieGraph)