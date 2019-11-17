import React, { useState, Fragment } from "react";

import { Container, Panel } from "./style";
import TextField from "@material-ui/core/TextField";
import Button from "../../Button";

import { updateProject } from "../../../api/projects";

import "styled-components/macro";

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
  const [desc, setDesc] = useState(long_description);

  return (
    <Container gridArea={gridArea}>
      <Panel theme_color={theme_color} />
      <div className="Main">
        <div className="Name">{name ? name : "No name"}</div>
        {edit ? (
          <Fragment>
            <TextField
              type="text"
              value={desc}
              multiline
              variant="outlined"
              onChange={e => setDesc(e.target.value)}
              InputProps={{ style: { fontSize: "20px" } }}
              style={{
                marginRight: "30%"
              }}
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
                    goals,
                    scopes,
                    requirements,
                    mentor_id,
                    number_of_members,
                    technology,
                    academic_contact_id,
                    tags,
                    long_description: desc,
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
        ) : long_description ? (
          <div className="Desc" onClick={() => setEdit(true)}>
            {long_description}
          </div>
        ) : (
          <div className="Desc" onClick={() => setEdit(true)}>
            <span>+</span> Add description to your project
          </div>
        )}
      </div>
    </Container>
  );
};
