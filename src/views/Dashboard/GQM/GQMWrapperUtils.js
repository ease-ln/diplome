/**
 * Calculate amount of metrics for layout
 * @param questions - questions object from the dashboard
 * @returns array with total amount of metrics and array with metrics amount on each pane
 */
export function getMetricsAmount(questions) {
  let meticsOnPane = [];
  questions.map((q) => meticsOnPane.push(q.metrics.length));
  const metrics = meticsOnPane.reduce((a, b) => a + b, 0);
  return [meticsOnPane, metrics];
}

/**
 * Generate item layout properties
 * (Check react-grid-layout grid item props)
 * @param ind - index of metric
 * @param width - how much columns should the metric take
 * @param metricsOnPane - amount of metrics on each pane
 * @returns item property for grid layout
 */
export function getMetricLayout(ind, width, metricsOnPane) {
  let indexOnPage = ind;
  for (let m of metricsOnPane) {
    if (indexOnPage >= m) indexOnPage -= m;
    else break;
  }
  return {
    i: ind.toString(),
    x: width * indexOnPage,
    y: 0,
    w: width,
    h: 1, //height=408px
    minW: width,
    resizeHandles: ["e"], //Resizable to the right(east)
  };
}

/**
 * Generate layout of metrics for react grid
 * (Check react-grid-layout grid layout props)
 * @param itemsAmount - amount of metrics
 * @param width - how much columns should each metric take
 * @param metricsOnPane - amount of metrics on each pane
 * @returns grid layout
 */
export function getLayout(itemsAmount, width, metricsOnPane) {
  let layout = [];
  let j = 0
  for (let i of [...Array(itemsAmount).keys()]) {
    if (typeof width === 'object') {
      layout.push(getMetricLayout(i, width[j], metricsOnPane));
      if(width.length !== j+1) j += 1
    } else {
      layout.push(getMetricLayout(i, width, metricsOnPane));
    }
  }
  return layout;
}

/**
 * Compact layout if there is enough empty space in row for element
 * @param layout - changed layout (Check react-grid-layout layout props)
 * @param metricsOnPane - amount of metrics on each pane
 * @param columns - amount of columns
 */
export function compactLayout(layout, metricsOnPane, columns) {
  let iter = 0;
  for (let paneInd in metricsOnPane) {
    //Find metrics on pane and sort them according to position on the screen
    //(from top to bottom from left to right)
    let paneMetricsLayouts = layout.slice(iter, iter + metricsOnPane[paneInd]);
    paneMetricsLayouts.sort((el1, el2) => (el1.x < el2.x ? -1 : 1)); // sort by x
    paneMetricsLayouts.sort((el1, el2) => (el1.y < el2.y ? -1 : 1)); // sort by y
    //Go through them and try to push element to the top if there is enough space
    let currY = 0;
    let currMetricInd = 0;
    let totalW = 0;
    let rowShift = 0; //How much elements should be shifted to the left
    let nextRowProcessingFlag = false;
    while (currMetricInd < paneMetricsLayouts.length) {
      const currMetric = paneMetricsLayouts[currMetricInd];
      if (currMetric.y === currY) {
        //Element on current row
        totalW += currMetric.w;
        currMetricInd += 1;
        currMetric.x -= rowShift;
      } else {
        if (!nextRowProcessingFlag) {
          //When transitioning from current row to next row
          rowShift = 0;
        }
        if (totalW + currMetric.w <= columns) {
          //Element from next row can be pushed to the current
          currMetric.y = currY;
          currMetric.x = totalW;
          totalW += currMetric.w;
          currMetricInd += 1;
          nextRowProcessingFlag = true;
          rowShift += currMetric.w;
        } else {
          //Element from next row cannot be pushed to the current
          currY += 1;
          totalW = 0;
          nextRowProcessingFlag = false;
        }
      }
    }
    iter += metricsOnPane[paneInd];
  }
}

export function saveLaoutsToLS(value, metricsOnPane, metricsAmount) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "metrics-layout",
      JSON.stringify({
        layouts: value,
        metricsAmount: [metricsOnPane, metricsAmount],
      })
    );
  }
}

export function getLayoutsFromLS(metricsOnPane, metricsAmount) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("metrics-layout")) || {};
    } catch (e) {}
  }
  if (
    JSON.stringify(ls["metricsAmount"]) ===
    JSON.stringify([metricsOnPane, metricsAmount])
  )
    return ls["layouts"];
  else return false;
}
