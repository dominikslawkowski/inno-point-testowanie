import React, { useState, Fragment } from "react";
import { Container, Panel, Technology, TechContainer } from "./style";
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
  const [tech, setTech] = useState(technology);
  return (
    <Container gridArea={gridArea}>
      <div className="Main">
        <div className="Label">Technology</div>
        <div />
        {edit ? (
          <Fragment>
            <TextField
              type="text"
              value={tech}
              multiline
              variant="outlined"
              onChange={e => setTech(e.target.value)}
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
                label="Update"
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
                    technology: tech,
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
        ) : (
          <TechContainer
            className="TechContainer"
            onClick={() => setEdit(true)}
          >
            {technology ? (
              technology.split(",").map((technology, index) => (
                <Technology theme_color={theme_color} key={index}>
                  {technology}
                </Technology>
              ))
            ) : (
              <Technology theme_color={"gray"} key={0}>
                Add +
              </Technology>
            )}
          </TechContainer>
        )}
      </div>
    </Container>
  );
};
