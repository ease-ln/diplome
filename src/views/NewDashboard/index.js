import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
//GQM
import GQMWrapper from "./GQM/GQMWrapper";
import { GQMCardsToQuestions } from "./GQMCardsConfig/index";
import {
  getGoal,
  // getQuestions,
  getQuestionById,
} from "../GQMConfig/GQM/GQMHelper";

import { ChooseProject, ChooseComponent } from "./DropDowns/index.js";

import "./Dashboard.scss";

const Dashboard = () => {
  const [goal, setGoal] = useState(
    "You did not set up the GQM model, so you will see the default settings"
  );
  const [project, setProject] = useState({
    isactive: undefined,
    projectID: undefined,
    name: undefined,
  });
  const [SQProject, setSQProject] = useState({
    isactive: undefined,
    projectID: undefined,
    name: undefined,
  });

  const users = useSelector((state) => state.users).toJS().users;
  const email = JSON.parse(localStorage.getItem("innometrics-email"));
  // const USER_TYPE = 'developer'

  //get GQM questions and metrics for them
  const [GQMConfigCards, setGQMConfigCards] = useState();
  useLayoutEffect(() => {
    if (email) {
      getGoal(localStorage.getItem('mr-token'), localStorage.getItem('user_id'))
        .then((res) => {
          if (res && res.length !== 0) {
            setGoal(res[0].content);
            //create promises questionID X reqs
            let reqArray = res[0].questions.map((item) => {
              return getQuestionById(item.id);
            });

            //get all metrics to questions
            Promise.all(reqArray).then((res) => {
              setGQMConfigCards(GQMCardsToQuestions(res));
            });
          } else {
            setGQMConfigCards(GQMCardsToQuestions([]));
          }
        })
        .catch(() => {
          setGQMConfigCards(GQMCardsToQuestions([]));
        });
    }
  }, []);

  return (
    <>
      <ChooseProject setProject={setProject} project={project} />
      {project.projectID && (
        <ChooseComponent
          setSQProject={setSQProject}
          SQProject={SQProject}
          projectID={project.projectID}
        />
      )}
      {GQMConfigCards ? (
        <GQMWrapper
          goal={goal}
          questions={GQMConfigCards}
          userRole={"manager"}
          users={users}
          projectID={project.projectID}
          SQProject={SQProject.projectID}
        />
      ) : (
        <p>waiting</p>
      )}
    </>
  );
};
export default Dashboard;
