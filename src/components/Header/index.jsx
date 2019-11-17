import React from "react";
import { withRouter } from "react-router-dom";
import { Container, StyledLink } from "./style";
import { iconStyle } from "./style";
import {
  Dvr,
  ViewList,
  People,
  Announcement,
  AccountCircle,
  ExitToApp
} from "@material-ui/icons";

export default withRouter(props => {
  const { pathname } = props.history.location;
  return (
    <Container>
      <div className="Top">
        <img src="/icons/logo.png" />
      </div>
      <StyledLink to="/dashboard/projects" pathname={pathname}>
        <ViewList style={iconStyle} />
        <span>Projects</span>
      </StyledLink>
      <StyledLink to="/dashboard/teams" pathname={pathname}>
        <People style={iconStyle} />
        <span>Teams</span>
      </StyledLink>
      <StyledLink to="/dashboard/news" pathname={pathname}>
        <Announcement style={iconStyle} />
        <span>News</span>
      </StyledLink>
      <div />
      <div />
      <StyledLink to="/dashboard/profile" pathname={pathname}>
        <AccountCircle style={iconStyle} />
        <span>Profile</span>
      </StyledLink>
      <StyledLink
        to="/"
        onClick={() => localStorage.clear()}
        pathname={pathname}
      >
        <ExitToApp style={iconStyle} />
        <span>Log out</span>
      </StyledLink>
    </Container>
  );
});
