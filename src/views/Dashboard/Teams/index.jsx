import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Container,
  MainContainer,
  FormContainer,
  TopBar,
  StyledSpinner
} from "./style";

import {
  tooltipStyle,
  fabAddStyle,
  fabBackStyle,
  StyledTypeOfList,
  iconAddStyle,
  iconBackStyle,
  StyledTooltip,
  Label
} from "./style";

import {
  projectsReadRequest,
  teamsReadRequest,
  usersReadRequest,
  userReadRequest
} from "../../../actions";

import { TeamCard, TeamForm } from "../../../components";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { List, GridOn } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import { People } from "@material-ui/icons";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Teams = props => {
  const [typeOfList, setTypeOfList] = useState("block");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleTypeOfList(event, newValue) {
    setTypeOfList(newValue);
  }

  useEffect(() => {
    props.readProjects();
    props.readTeams();
    props.readUsers();
    props.readUser();
  }, [update]);

  const {
    projects: { items: projects },
    teams: { items: teams },
    users: { items: users }
  } = props;

  if (
    !projects ||
    Object.keys(projects).length === 0 ||
    !users ||
    Object.keys(users).length === 0 ||
    !teams ||
    Object.keys(teams).length === 0
  ) {
    return <StyledSpinner />;
  }

  return (
    <div>
      <TopBar>
        <Label>
          <People />
          <span>Teams</span>
        </Label>
        <div className="Searchbar">
          <InputBase placeholder="Search…" style={{ width: "100%" }} />
          <SearchIcon />
        </div>
      </TopBar>
      <MainContainer>
        <Container typeOfList={typeOfList}>
          {teams &&
            teams.map((team, index) => {
              const teamUsers = users.filter(user => user.team_id === team.id);
              const teamProject = projects.find(
                project => project.id === team.project_id
              );
              return (
                <TeamCard
                  team={team}
                  users={teamUsers}
                  project={teamProject}
                  index={index}
                />
              );
            })}
        </Container>
      </MainContainer>
      <StyledTypeOfList value={typeOfList} onChange={handleTypeOfList}>
        <BottomNavigationAction label="Block" value="block" icon={<GridOn />} />
        <BottomNavigationAction label="List" value="list" icon={<List />} />
      </StyledTypeOfList>
      <StyledTooltip
        title={"Add team"}
        aria-label="Add"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Link to="#">
          <Fab style={fabAddStyle}>
            <AddIcon style={iconAddStyle} />
          </Fab>
        </Link>
      </StyledTooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={false}
        onClose={handleClose}
      >
        <TeamForm
          user={props.user}
          setUpdate={setUpdate}
          update={update}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  teams: state.teams,
  projects: state.projects,
  users: state.users,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  readTeams: () => dispatch(teamsReadRequest()),
  readProjects: () => dispatch(projectsReadRequest()),
  readUsers: () => dispatch(usersReadRequest()),
  readUser: () => dispatch(userReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
