// date.setDate(date.getDate() - days)
const getDateWithoutTime = (dateString) => {
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	const newDate = new Date(year, month, day)

	return newDate
}
export const preprocessData = (data, startDate, endDate) => {
	let DateStartDate = new Date(startDate).getTime()
	let date = new Date(endDate)
	
	let allDates = []
	allDates.push(date.toString()) 

	//get all dates
	while (DateStartDate !== date.getTime()) {
		date.setDate(date.getDate() - 1)
		allDates.push(date.toString()) 
	}
	allDates.reverse();

	//get all options
	let allOptions = []
	let k = 0
	for (let i = 0; i < allDates.length; i++){
		if (k === data.labels.length) {
			allOptions.push(0)
			continue
		}

		let newDate = getDateWithoutTime(allDates[i]).getTime()
		let oldDate = getDateWithoutTime(data.labels[k].split('/').reverse().join('-')).getTime()
		if (newDate === oldDate ) {
			allOptions.push(data.datasets[0].data[k])
			k += 1
		} else {
			allOptions.push(0)
		}
	}

	return {
		labels: allDates,
		allOptions: [{
			name: data.datasets[0].label,
			data: allOptions
		}]
	}
}
