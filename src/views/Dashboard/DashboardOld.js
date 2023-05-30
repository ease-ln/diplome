import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  CardColumns
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const Widget01 = lazy(() => import("../../views/Widgets/Widget01"));
const Widget02 = lazy(() => import("../../views/Widgets/Widget02"));
const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
const Widget04 = lazy(() => import("../../views/Widgets/Widget04"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ]
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ]
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  }
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" }
];

const makeSocialBoxData = dataSetNo => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients"
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews"
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic"
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR"
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate"
  }
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  },
  legend: {
    display: false
  }
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const bar1 = {
  labels: ["Day 1", "Day 3", "Day 5", "Day 7", "Day 9", "Day 14"],
  datasets: [
    {
      label: "Story Points",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [100, 110, 85, 85, 90, 100]
    }
  ]
};

const bar2 = {
  labels: [
    "Sprint 1",
    "Sprint 2",
    "Sprint 3",
    "Sprint 4",
    "Sprint 5",
    "Sprint 6",
    "Sprint 7"
  ],
  datasets: [
    {
      label: "Story Points",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [1000, 920, 870, 889, 760, 650, 610]
    }
  ]
};

const bar3 = {
  labels: [
    "Sprint 1",
    "Sprint 2",
    "Sprint 3",
    "Sprint 4",
    "Sprint 5",
    "Sprint 6"
  ],
  datasets: [
    {
      label: "Story Points",
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(75,192,192,1)",
      hoverBorderColor: "rgba(220,220,220,1)",
      data: [180, 140, 120, 155, 195, 140]
    }
  ]
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-3">
          <Card>
            <CardHeader>
              Iteration Burndown Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar1} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Release Burndown Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar2} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              Team Velocity Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar3} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>

        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card1"
                    isOpen={this.state.card1}
                    toggle={() => {
                      this.setState({ card1: !this.state.card1 });
                    }}
                  >
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem disabled>Disabled action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">9.823</div>
                <div>Average Cycle Time</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData2}
                  options={cardChartOpts2}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown
                    id="card2"
                    isOpen={this.state.card2}
                    toggle={() => {
                      this.setState({ card2: !this.state.card2 });
                    }}
                  >
                    <DropdownToggle className="p-0" color="transparent">
                      <i className="icon-location-pin" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">9.823</div>
                <div>Average Load Time</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Line
                  data={cardChartData1}
                  options={cardChartOpts1}
                  height={70}
                />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="4" lg="2">
            <Suspense fallback={this.loading()}>
              <Widget01
                color="success"
                header="85%"
                value="85"
                mainText="Code Coverage"
                smallText="Above average"
              />
            </Suspense>
          </Col>

          <Col xs="12" sm="4" lg="2">
            <Suspense fallback={this.loading()}>
              <Widget01
                color="success"
                header="100%"
                value="100"
                mainText="Passed Tests"
                smallText="Great work!"
              />
            </Suspense>
          </Col>

          <Col xs="12" sm="4" lg="2">
            <Suspense fallback={this.loading()}>
              <Widget01
                color="success"
                header="99%"
                value="99"
                mainText="Defects Removed"
                smallText="Your repository is almost defect-free."
              />
            </Suspense>
          </Col>

          {/*
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown
                    id="card4"
                    isOpen={this.state.card4}
                    toggle={() => {
                      this.setState({ card4: !this.state.card4 });
                    }}
                  >
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
                <Bar
                  data={cardChartData4}
                  options={cardChartOpts4}
                  height={70}
                />
              </div>
            </Card>
          </Col>
          */}
        </Row>

        <Row>
          <Col xs="12" sm="3" lg="3">
            <Widget02
              header="8"
              mainText="DETECTED DEFECTS"
              icon="fa fa-search"
              color="success"
            />
          </Col>

          <Col xs="12" sm="3" lg="3">
            <Widget02
              header="0"
              mainText="UNRESOLVED DEFECTS"
              icon="fa fa-hashtag"
              color="success"
            />
          </Col>

          <Col xs="12" sm="3" lg="3">
            <Widget02
              header="0.00"
              mainText="DEFECT DENSITY"
              icon="fa fa-percent"
              color="primary"
            />
          </Col>

          <Col xs="12" sm="3" lg="3">
            <Widget02
              header="783/81"
              mainText="CLASS/METHOD LENGTH"
              icon="fa fa-hashtag"
              color="primary"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" lg="6">
            <Widget02
              header="0.60"
              mainText="EFFORT ESTIMATION ACCURACY"
              icon="fa fa-laptop"
              color="danger"
            />
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Widget02
              header="14"
              mainText="ITERATION DAY"
              icon="fa fa-calendar"
              color="warning"
            />
          </Col>
        </Row>

        {/*
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">November 2015</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right">
                      <i className="icon-cloud-download" />
                    </Button>
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups"
                    >
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}
                        >
                          Day
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}
                        >
                          Month
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(3)}
                          active={this.state.radioSelected === 3}
                        >
                          Year
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Visits</div>
                    <strong>29.703 Users (40%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value="40"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Unique</div>
                    <strong>24.093 Users (20%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="info"
                      value="20"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pageviews</div>
                    <strong>78.706 Views (60%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="warning"
                      value="60"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">New Users</div>
                    <strong>22.123 Users (80%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="danger"
                      value="80"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Bounce Rate</div>
                    <strong>Average Rate (40.15%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="primary"
                      value="40"
                    />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        */}

        {/*
        <Row>
          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget03
                dataBox={() => ({
                  variant: "facebook",
                  friends: "89k",
                  feeds: "459"
                })}
              >
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(0)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </Widget03>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget03
                dataBox={() => ({
                  variant: "twitter",
                  followers: "973k",
                  tweets: "1.792"
                })}
              >
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(1)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </Widget03>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget03
                dataBox={() => ({
                  variant: "linkedin",
                  contacts: "500+",
                  feeds: "292"
                })}
              >
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(2)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </Widget03>
            </Suspense>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <Suspense fallback={this.loading()}>
              <Widget03
                dataBox={() => ({
                  variant: "google-plus",
                  followers: "894",
                  circles: "92"
                })}
              >
                <div className="chart-wrapper">
                  <Line
                    data={makeSocialBoxData(3)}
                    options={socialChartOpts}
                    height={90}
                  />
                </div>
              </Widget03>
            </Suspense>
          </Col>
        </Row>
        */}
      </div>
    );
  }
}

export default Dashboard;
