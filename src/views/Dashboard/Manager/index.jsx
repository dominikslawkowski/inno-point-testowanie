import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  projectsReadRequest,
  teamsReadRequest,
  userReadRequest,
  usersReadRequest
} from "../../../actions";
import { Dvr } from "@material-ui/icons";

import { css } from "emotion";

import { ProjectCard, TeamCard } from "../../../components";

export const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 50px;
  margin-top: 60px;
  color: #00336e !important;
  font-size: 24px;
  border-radius: 8px;
  padding: 7px;
  padding-bottom: 10px;

  > span {
    margin-left: 10px;
  }

  transition: all 0.2s ease-in-out;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;

  > div.Searchbar {
    margin-top: 50px;
    margin-right: 60px;
    display: flex;
    align-items: center;
    width: 250px;
    height: 25px;
    background-color: rgba(255, 255, 255, 70%);
    border-radius: 50px;
    padding: 8px 15px;
    justify-self: end;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.1s ease-in-out;

    @media (max-width: 500px) {
      width: 150px;
    }

    > input {
      width: 250px;
      transition: all 0.1s ease-in-out;
    }
  }

  > div.Label {
    align-items: center;
    margin-top: 50px;
    margin-left: 60px;
    font-size: 20px;
    padding: 5px 15px;
    border-radius: 8px;
    color: gray;
    background: white;
  }
`;

const Manager = props => {
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  let { projects, teams, user, users } = props;

  useEffect(() => {
    props.readProjects();
    props.readTeams();
    props.readUser();
  }, [update]);

  //   if (!projects || projects.length === 0) {
  //     return <StyledSpinner />;
  //   }

  if (inputValue) {
    projects = projects.filter(project => project.name.includes(inputValue));
  }

  const team = teams.find(e => e.id === user.team_id) || {};
  let project = {};
  let teamUsers = [];
  if (team) {
    project = projects.find(e => e.id === team.project_id);
    teamUsers = users.filter(user => user.team_id === team.id);
  }

  return (
    <div>
      <TopBar>
        <Label>
          <Dvr />
          <span>Manager</span>
        </Label>
      </TopBar>
      <div
        className={css`
          margin-top: 100px;
          margin-left: 100px;
          margin-right: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {project && Object.keys(project).length > 0 && (
          <div
            className={css`
              text-decoration: none;
              margin: 20px;
            `}
          >
            <ProjectCard
              team={team}
              users={teamUsers}
              project={project}
              index={1}
            />
          </div>
        )}
        {team && Object.keys(team).length > 0 && (
          <div
            className={css`
              text-decoration: none;
              margin: 20px;
              width: 350px;
            `}
          >
            <TeamCard
              team={team}
              users={teamUsers}
              project={project}
              index={1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const projects = state.projects.items;
  const teams = state.teams.items;
  const user = state.user;
  const users = state.users.items;
  return {
    projects,
    teams,
    user,
    users
  };
};

const mapDispatchToProps = dispatch => ({
  readProjects: () => dispatch(projectsReadRequest()),
  readTeams: () => dispatch(teamsReadRequest()),
  readUser: () => dispatch(userReadRequest()),
  readUsers: () => dispatch(usersReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
