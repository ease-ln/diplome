import {
    sampleLineConfig,
} from "./DashboardHelper.js";

export const getNumberData = (numOfClasses) => {
    const labels = [];
    const datasets = [sampleLineConfig("All teams")];

    labels.push(0);
    datasets[0].data.push(numOfClasses);

    return {
        labels,
        datasets,
    };
};

export const getNumberOptions = () => {
    return null
};
