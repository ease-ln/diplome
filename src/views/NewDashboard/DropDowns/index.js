import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  fetchAgentsList,
  fetchSQProjectList,
} from "../../../redux/common/flows.js";

export const ChooseProject = ({ setProject, project }) => {
  const projects = useSelector((state) => state.projects).toJS().projects;

  useLayoutEffect(() => {
    if (projects.length === 0) return;
    setProject(projects[0]);
  }, []);

  return (
    <>
      <DropDownWidget
        list={projects}
        setItem={setProject}
        item={project}
        placeHolder={"Project"}
      />
    </>
  );
};

export const ChooseComponent = ({ setSQProject, SQProject, projectID }) => {
  const [allSqrPorject, setAllSqrPorject] = useState([]);

  const getProjestIDS = async (projectID) => {
    let data = await fetchAgentsList(projectID);

    if (data && data.agentList[4] && data.agentList[4].isconnected === "Y") {
      let list = await fetchSQProjectList(projectID);
      let newArr = [];
      for (let el of list.projectList) {
        if (el.isconnected === "Y") {
          newArr.push(el);
        }
      }
      const tempNewAr = newArr.map((item) => {
        return {
          isactive: item.isconnected,
          projectID: item.projectId,
          name: item.projectName,
        };
      });
      setSQProject(tempNewAr[0]);
      setAllSqrPorject(tempNewAr);
    }
  };
  useEffect(() => {
    if (typeof projectID !== "number") return;
    getProjestIDS(projectID);
  }, []);
  return (
    <>
      <DropDownWidget
        list={allSqrPorject}
        setItem={setSQProject}
        item={SQProject}
        placeHolder={"Components"}
      />
    </>
  );
};

const DropDownWidget = ({ list, setItem, item, placeHolder }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dropdown
        isOpen={open}
        toggle={() => setOpen(!open)}
        style={{
          marginBottom: "0.7rem",
          marginRight: "10px",
          display: "inline-block",
        }}
      >
        <DropdownToggle caret color="light">
          {item.name ? item.name : placeHolder + " select"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{placeHolder}</DropdownItem>
          {list.map((p) => (
            <DropdownItem key={p.name} onClick={() => setItem(p)}>
              {p.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
