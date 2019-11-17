import React, { useState, Fragment } from "react";
import { Container, Panel, Technology } from "./style";
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
  const [newTags, setNewTags] = useState(tags);
  return (
    <Container gridArea={gridArea}>
      <div className="Main">
        <div className="Label">Tags</div>
        <div />
        {edit ? (
          <Fragment>
            <TextField
              type="text"
              value={newTags}
              multiline
              variant="outlined"
              onChange={e => setNewTags(e.target.value)}
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
                    technology,
                    academic_contact_id,
                    tags: newTags,
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
          <div className="TagsContainer" onClick={() => setEdit(true)}>
            {tags ? (
              tags.split(",").map((tag, index) => (
                <Technology theme_color={theme_color} key={index}>
                  {tag}
                </Technology>
              ))
            ) : (
              <Technology theme_color={"gray"} key={0}>
                Add +
              </Technology>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};
