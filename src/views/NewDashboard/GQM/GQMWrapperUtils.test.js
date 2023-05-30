import {
  getMetricsAmount,
  getMetricLayout,
  getLayout,
  compactLayout,
  saveLaoutsToLS,
  getLayoutsFromLS,
} from "./GQMWrapperUtils";

describe("Function getMetricsAmount", () => {
  test("Proper result on current set", () => {
    expect(
      getMetricsAmount([
        {
          name: "What is the Overall Time Spent?",
          metrics: [
            {
              id: 0,
              name: "Accumulated Total Time Spent",
            },
            {
              id: 1,
              name: "Accumulated Activities",
            },
          ],
        },
        {
          name: "What Type of Apps do Users Mostly Use?",
          metrics: [
            {
              id: 2,
              name: "Top 5 Apps Per Person Daily",
            },
            {
              id: 3,
              name: "Category Chart",
            },
          ],
        },
        {
          name: "What is the Overall Code Quality?",
          metrics: [
            {
              id: 4,
              name: "SonarQube Coverage",
            },
          ],
        },
      ])
    ).toEqual([[2, 2, 1], 5]);
  });
});

describe("Function getLayout", () => {
  const metricsOnPane = [5, 5, 5, 5];
  test("Generate specified amount of metrics", () => {
    expect(getLayout(20, 5, metricsOnPane).length).toBe(20);
  });
  test("Each metric has specified width", () => {
    const layout = getLayout(20, 5, metricsOnPane);
    for (const metric of layout) {
      expect(metric.w).toBe(5);
    }
  });
  test("There are no more metrics on each pane than specified", () => {
    const width = 5;
    const layout = getLayout(20, width, metricsOnPane);
    for (const metric of layout) {
      expect(parseInt(metric.x) / width).toBeLessThanOrEqual(5);
    }
  });
});

describe("Function compactLayout", () => {
  test("Place element on previous row if there is enough space", () => {
    let layout = [
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 2, x: 0, y: 1 },
    ];
    compactLayout(layout, [3], 6);
    expect(layout).toEqual([
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 2, x: 4, y: 0 },
    ]);
  });
  test("Place element on the highest row with enough space", () => {
    let layout = [
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 2, x: 0, y: 10 },
    ];
    compactLayout(layout, [3], 6);
    expect(layout).toEqual([
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 2, x: 4, y: 0 },
    ]);
  });
  test("Place few elements on the highest row with enough space", () => {
    let layout = [
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 1, x: 0, y: 10 },
      { w: 1, x: 0, y: 20 },
    ];
    compactLayout(layout, [4], 6);
    expect(layout).toEqual([
      { w: 2, x: 0, y: 0 },
      { w: 2, x: 2, y: 0 },
      { w: 1, x: 4, y: 0 },
      { w: 1, x: 5, y: 0 },
    ]);
  });
  test(
    "Elements pushed to the previous row" +
      "\n does not affect compact function on that row",
    () => {
      let layout = [
        { w: 2, x: 0, y: 0 },
        { w: 2, x: 2, y: 0 },
        { w: 2, x: 0, y: 1 },
        { w: 2, x: 2, y: 1 },
        { w: 2, x: 4, y: 1 },
        { w: 2, x: 0, y: 2 },
        { w: 2, x: 2, y: 2 },
      ];
      compactLayout(layout, [7], 6);
      expect(layout).toEqual([
        { w: 2, x: 0, y: 0 },
        { w: 2, x: 2, y: 0 },
        { w: 2, x: 4, y: 0 },
        { w: 2, x: 0, y: 1 },
        { w: 2, x: 2, y: 1 },
        { w: 2, x: 4, y: 1 },
        { w: 2, x: 0, y: 2 },
      ]);
    }
  );
});
