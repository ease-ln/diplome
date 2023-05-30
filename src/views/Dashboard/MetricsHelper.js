const generateMetricsList = (
    listOfMetrics,
    timeReturn,
    activityReturn,
    cumulReturn,
    categoryReturn,
    numOfClassesReturn,
    LOCReturn,
    CodeCoverageReturn
) => {
    listOfMetrics.forEach(metrics => {
        if (metrics.name === 'Accumulated Total Time Spent') {
            metrics.id = 0
            metrics.type = 'line'
            metrics.userSelectEnabled = false
            metrics.withEndDate = true
            metrics.api = timeReturn
        }
        if (metrics.name === 'Accumulated Activities') {
            metrics.id = 1
            metrics.type = 'pie'
            metrics.userSelectEnabled = false
            metrics.withEndDate = true
            metrics.api = activityReturn
        }
        if (metrics.name === 'Top 5 Apps per Day') {
            metrics.id = 2
            metrics.name = 'Top 5 Apps Per Person Daily'
            metrics.type = 'line'
            metrics.userSelectEnabled = true
            metrics.withEndDate = false
            metrics.api = cumulReturn
        }
        if (metrics.name === 'Category Chart') {
            metrics.id = 3
            metrics.type = 'bar'
            metrics.userSelectEnabled = false
            metrics.withEndDate = true
            metrics.api = categoryReturn
        }
        if (metrics.name === 'SQ Number of Classes') {
            metrics.id = 4
            metrics.name = 'SonarQube Number of Classes'
            metrics.type = 'number'
            metrics.userSelectEnabled = false
            metrics.withEndDate = false
            metrics.api = numOfClassesReturn
        }
        if (metrics.name === 'SQ Lines of Code') {
            metrics.id = 5
            metrics.name = 'SonarQube LOC'
            metrics.type = 'number'
            metrics.userSelectEnabled = false
            metrics.withEndDate = false
            metrics.api = LOCReturn
        }
        if (metrics.name === 'SQ Coverage') {
            metrics.id = 6
            metrics.name = 'SonarQube Code Coverage'
            metrics.type = 'number'
            metrics.userSelectEnabled = false
            metrics.withEndDate = false
            metrics.api = CodeCoverageReturn
        }
    })
    return listOfMetrics
}

export default generateMetricsList
