import React, { useState, useLayoutEffect, useMemo } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card } from "reactstrap";
import classnames from "classnames";
import { Responsive as ResponsiveReactGridLayout } from "react-grid-layout";

import NewMetric from "./NewMetric";

import "./GQMWrapper.scss";

import {
  getMetricsAmount,
  getLayout,
  compactLayout,
  saveLaoutsToLS,
  getLayoutsFromLS,
} from "./GQMWrapperUtils";

export default function GQMWrapper({
  goal,
  questions,
  userRole,
  users,
  projectID,
  SQProject,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [paneWidth, setStoredPaneWidth] = useState(520);

  /**
   * Current amount of metrics and columns
   */
  const [METRICS_ON_PANE, METRICS_AMOUNT] = useMemo(
    () => getMetricsAmount(questions),
    [questions]
  );
  const COLUMNS = 6;

  const getDefaultLayouts = (pane, size) => {
    return questions[pane].metrics.map((item) =>
      item.defaultLayout ? item.defaultLayout[size] : 2
    );
  };

  const [layoutsF, setLayoutsF] = useState(
    getLayoutsFromLS(0) || {
      lg: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(0, "lg"),
        METRICS_ON_PANE
      ),
      md: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(0, "md"),
        METRICS_ON_PANE
      ),
      sm: getLayout(METRICS_AMOUNT, 6, METRICS_ON_PANE),
      xs: getLayout(METRICS_AMOUNT, 6, METRICS_ON_PANE),
    }
  );
  const [layoutsS, setLayoutsS] = useState(
    getLayoutsFromLS(1) || {
      lg: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(1, "lg"),
        METRICS_ON_PANE
      ),
      md: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(1, "md"),
        METRICS_ON_PANE
      ),
      sm: getLayout(METRICS_AMOUNT, 3, METRICS_ON_PANE),
      xs: getLayout(METRICS_AMOUNT, 6, METRICS_ON_PANE),
    }
  );
  const [layoutsTh, setLayoutsTh] = useState(
    getLayoutsFromLS(2) || {
      lg: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(2, "lg"),
        METRICS_ON_PANE
      ),
      md: getLayout(
        METRICS_AMOUNT,
        getDefaultLayouts(2, "md"),
        METRICS_ON_PANE
      ),
      sm: getLayout(METRICS_AMOUNT, 3, METRICS_ON_PANE),
      xs: getLayout(METRICS_AMOUNT, 6, METRICS_ON_PANE),
    }
  );
  const allLayouts = [
    {
      pane: "layoutsF",
      data: layoutsF,
      func: setLayoutsF,
    },
    {
      pane: "layoutsS",
      data: layoutsS,
      func: setLayoutsS,
    },
    {
      pane: "layoutsTh",
      data: layoutsTh,
      func: setLayoutsTh,
    },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  /**
   * Save new layouts to local storage and component state
   * @param {lg:layout, md:layout, sm:layout, xs:layout} newLayouts - changed layouts
   */
  function handleLayoutChange(layouts, setLayouts, idx, newLayouts) {
    //As given newLayout keep metrics of one page and discards others
    //Given newLayout should be connected with data from original layout
    let changedLayout; // lg/md/sm/xs
    for (let newLayout in newLayouts) {
      if (newLayouts[newLayout].length < METRICS_AMOUNT) {
        changedLayout = newLayout;
        for (let metricLayout of newLayouts[newLayout]) {
          layouts[newLayout][metricLayout.i] = metricLayout;
        }
      }
    }
    compactLayout(layouts[changedLayout], METRICS_ON_PANE, COLUMNS);
    setLayouts(Object.assign({}, layouts)); //trigger rerender
    updatePaneWidth();
    saveLaoutsToLS(layouts, idx);
  }

  //Set paneWidth based on current DOM element width
  function updatePaneWidth() {
    //Faster than pane itself while the width is the same
    const pane = document.getElementsByClassName("nav nav-tabs")[0];
    if (pane) {
      if (paneWidth !== pane.clientWidth) {
        let tempWidth;
        tempWidth = pane.clientWidth;
        setStoredPaneWidth(tempWidth);

        //Sometimes width is not tracked correctly at first
        setTimeout(() => {
          if (tempWidth !== pane.clientWidth) {
            setStoredPaneWidth(pane.clientWidth);
          }
        }, 200);
      }
    }
  }

  //Add event listeners to update pane width
  useLayoutEffect(() => {
    window.addEventListener("resize", updatePaneWidth);
    updatePaneWidth();
    const intrevalUpdatePaneWidth = setInterval(() => updatePaneWidth(), 3000);
    return () => {
      clearInterval(intrevalUpdatePaneWidth);
      window.removeEventListener("resize", updatePaneWidth);
    };
  }, []);

  return (
    <Card>
      <h4
        style={{
          marginLeft: "1rem",
          marginTop: "0.5rem",
        }}
      >
        Goal: {goal}
      </h4>
      <Nav tabs>
        {questions.map((q, idx) => (
          <NavItem key={q.name}>
            <NavLink
              className={classnames({ active: activeTab === idx })}
              onClick={() => {
                toggle(idx);
                setTimeout(() => updatePaneWidth(), 0);
              }}
            >
              <b>Question:</b> {q.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {questions.map((q, idx) => (
          <TabPane tabId={idx} key={q.name}>
            <ResponsiveReactGridLayout
              className="layout"
              layouts={allLayouts[idx].data}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
              cols={{ lg: COLUMNS, md: COLUMNS, sm: COLUMNS, xs: COLUMNS }}
              rowHeight={320}
              width={paneWidth - 30}
              margin={[10, 10]}
              compactType={"horizontal"}
              onLayoutChange={(_newLayout, newLayouts) =>
                handleLayoutChange(
                  allLayouts[idx].data,
                  allLayouts[idx].func,
                  idx,
                  newLayouts
                )
              }
            >
              {q.metrics.map((m) => (
                <div key={m.id}>
                  <NewMetric
                    name={m.name}
                    type={m.type}
                    userSelect={m.userSelectEnabled}
                    startAndEndDate={m.withEndDate}
                    api={m.api}
                    userRole={userRole}
                    users={users}
                    projectID={projectID}
                    SQProject={SQProject}
                    userSelectEmails={m.userSelectEmails}
                  />
                </div>
              ))}
            </ResponsiveReactGridLayout>
          </TabPane>
        ))}
      </TabContent>
    </Card>
  );
}
