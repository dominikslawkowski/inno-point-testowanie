import React, { useState, Fragment } from "react";
import { Container } from "./style";
import TextField from "@material-ui/core/TextField";
import Button from "../../Button";

import "styled-components/macro";

import { updateProject } from "../../../api/projects";

export default ({ project, gridArea, update, setUpdate }) => {
  const {
    id,
    name,
    short_description,
    team_id,
    goals,
    scopes,
    requirements,
    mentor_id,
    number_of_members,
    technology,
    academic_contact_id,
    tags,
    long_description,
    theme_color
  } = project;
  const [edit, setEdit] = useState(false);
  const [newGoals, setNewGoald] = useState(goals);
  return (
    <Container gridArea={gridArea}>
      <div className="Main">
        <div className="Label">Goals</div>
        {edit ? (
          <Fragment>
            <TextField
              type="text"
              value={newGoals}
              multiline
              variant="outlined"
              onChange={e => setNewGoald(e.target.value)}
              InputProps={{ style: { fontSize: "20px" } }}
            />
            <div
              css={`
                display: flex;
                > button {
                  margin: 5px;
                }
              `}
            >
              <Button
                color="blue"
                label="Add"
                size="small"
                onClick={() => {
                  const newProject = {
                    name,
                    short_description,
                    team_id,
                    goals: newGoals,
                    scopes,
                    requirements,
                    mentor_id,
                    number_of_members,
                    technology,
                    academic_contact_id,
                    tags,
                    long_description,
                    theme_color
                  };
                  updateProject(id, newProject).then(() => {
                    setUpdate(!update);
                    setEdit(false);
                  });
                }}
              />
              <Button
                color="red"
                label="Back"
                size="small"
                onClick={() => setEdit(false)}
              />
            </div>
          </Fragment>
        ) : goals ? (
          goals.split(",").map((goal, index) => (
            <div className="Goal" key={index} onClick={() => setEdit(true)}>
              <span className="Index">{index + 1}</span>
              <span className="Title"> {goal}</span>
            </div>
          ))
        ) : (
          <div className="Goal" onClick={() => setEdit(true)}>
            <span className="Index">+</span>
            <span className="Title">Click and add new goal</span>
          </div>
        )}
      </div>
    </Container>
  );
};
