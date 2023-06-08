import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardHeader, Label, Alert, Spinner } from "reactstrap";

import WidgetNumber from "./WidgetNumber/WidgetNumber.js";
import UserSelect from "../Helpers/UserSelect";
import DateOptions from "./DateOptions";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import { Preprocessers } from "./Preprocessers";
import * as Components from "./Components/DeveloperDie";
import { config } from '../../../services/config';

export default function NewMetric({
  name,
  type = "line",
  userSelect = null,
  userSelectEmails = false,
  startAndEndDate = false,
  api = null,
  userRole = "DEVELOPER",
  users = [],
  projectID,
  SQProject,
}) {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const [date, setDate] = useState(
    startAndEndDate
      ? new Date(currentDate.setDate(currentDate.getDate() - 30))
      : new Date()
  );
  const [endDate, setEndDate] = useState(new Date());
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("innometrics-email"))
  );
  const [status, setStatus] = useState({ loading: false, error: false }); //useState({ loading: true, error: false })
  const [data, setData] = useState();
  const [options, setOptions] = useState([]);

  // funct for emails in userSelect
  const fetchUsers = useCallback(
    (projectId) => {
      const url = `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.USERS}?ProjectId=${projectId}`;
      const token = localStorage.getItem('mr-token');
      const headers = { Token: token, Accept: "application/json" };
      return fetch(url, {
        method: "GET",
        headers,
      }).then((r) => r.json());
    },
    [projectID]
  );

  //fetch emails for userSelect
  useEffect(() => {
    if (!userSelect) return;
    fetchUsers(projectID)
      .then((res) => {
        if (!res || !res.userList || res.userList === 0) return;
        const t = res.userList.map((item) => item.email);
        setOptions(t);
      })
      .catch((er) => console.log(er));
  }, [projectID]);

  //fetch data
  useEffect(() => {
    setStatus({ loading: true, error: false });
    if (!api) {
      setStatus({ loading: false, error: true });
      return;
    }

    dispatch(
      api(
        email,
        // new Date('10-12-2021'),
        date,
        // new Date('10-12-2021'),
        startAndEndDate ? endDate : date,
        projectID,
        SQProject
      )
    )
      .then((res) => {
        setStatus({ loading: false, error: false });

        const tempData = Preprocessers(
          type,
          res,
          userRole,
          email,
          date,
          endDate,
          name
        );
        setData(tempData);

        if (!tempData || tempData.length === 0) return;
        if (!userSelect) return;
        //options for data that return all emails (accum time report)
        if (!userSelectEmails) {
          setOptions([
            "All team members",
            ...tempData.series.map((item) => item.name),
          ]);
          return;
        }
      })
      .catch((error) => {
        setStatus({ loading: false, error: true });
      });
  }, [email, date, endDate, projectID, SQProject]);

  const [userSelectResult, setUserSelectResult] = useState("");
  const getUserData = useCallback(() => {
    if (!userSelect) return data;
    if (userSelectEmails) return data;
    //default
    if (
      !userSelectResult ||
      userSelectResult === "" ||
      userSelectResult === "All team members"
    ) {
      if (!startAndEndDate && data && data.series)
        return { dates: data.dates, series: data.series[0].data };
      return data;
    }
    //exact selected series
    return {
      dates: data.dates,
      series: data.series.filter((item) => item.name === userSelectResult),
    };
  }, [data, userSelectResult]);

  const setDateOption = (startDate, endDate) => {
    setDate(startDate);
    setEndDate(endDate);
  };

  const userSelectOnChange = (e) => {
    if (userSelectEmails) {
      if (!e || e === "")
        setEmail(JSON.parse(localStorage.getItem("innometrics-email")));
      else setEmail(e);
    }
    setUserSelectResult(e);
  };

  const isData = useMemo(() => {
    if (userSelectEmails) return true;
    if (!data) return false;
    if (data.report && data.report.length === 0) return false;
    if (data.reports && data.reports.length === 0) return false;
    if (data.activityReports && data.activityReports.length === 0) return false;
    return true;
  }, [data]);

  return (
    <>
      <Card>
        <CardHeader style={{ height: "45px", padding: 0, margin: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "45px",
              backgroundColor: "#f0f3f5",
              alignContent: "center",
              padding: "0 20px",
            }}
          >
            <p
              style={{
                margin: 0,
                alignSelf: "center",
              }}
            >
              {name}
            </p>

            {userSelect &&
              isData &&
              userRole !== "developer" &&
              options &&
              options.length > 1 && (
                <div style={{ margin: "4px 4px 0 4px" }}>
                  <UserSelect onChange={userSelectOnChange} items={options} />
                </div>
              )}

            <DateOptions
              setOption={setDateOption}
              isRange={!!startAndEndDate}
              initialDate={date}
              endDate={endDate}
            />
          </div>
        </CardHeader>

        <CardBody
          style={{
            maring: 0,
            padding: "5px",
          }}
        >
          <div
            style={{
              height: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Mediator
              status={status}
              type={type}
              data={getUserData()}
              startAndEndDate={startAndEndDate}
              userRole={userRole}
              name={name}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

const Mediator = ({ status, type, data, startAndEndDate, userRole, name }) => {
  if (status.loading) return <Spinner animation="grow" variant="primary" />;
  if (status.error) return <Label>Something went wrong.</Label>;

  if (!data || data.length === 0) {
    return <Alert color="dark">No data. Try another date.</Alert>;
  }

  const getInfoBLock = () => {
    switch (name) {
      case "Accumulated Total Time Spent":
        return Components.InfoBlockForTime;
      case "Top 5 Apps Per Person Daily":
        return Components.InfoBlockForApps;
      default:
        return <Label>Something went wrong.</Label>;
    }
  };

  switch (type) {
    case "line":
      return (
        <LineGraph
          data={data}
          XAxisType={startAndEndDate ? "datetime" : "category"}
          userRole={userRole}
          InfoBlock={getInfoBLock()}
        />
      );
    case "pie":
      return <PieGraph data={data} />;
    case "number":
      return (
        <WidgetNumber
          header={data}
          color="primary"
          className="card-body-unset"
        />
      );
    default:
      return <p>graph</p>;
  }
};
