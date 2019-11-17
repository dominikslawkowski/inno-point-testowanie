import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./style";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AccountCircle } from "@material-ui/icons";
import { css } from "emotion";
import { userReadRequest } from "../../actions";

const show = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0.4;
  }
`;

export const iconStyle = {
  width: "100px",
  border: "solid 4px #0053b3",
  borderRadius: "50px",
  height: "100px",
  fontWeight: "100",
  color: "hsl(0, 0%, 80%)"
};

export const Picture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 4px #0053b3;
  animation: ${show} 0.2s linear;
`;

const Welcome = withRouter(props => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {
    token: urlParams.get("token")
  };

  const { readUser, user } = props;

  useEffect(() => {
    const token = params.token || localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      readUser();
      setTimeout(() => {
        props.history.push("/dashboard/projects");
      }, 1700);
    } else if (!token) {
      props.history.push("/");
    }
  }, []);

  return (
    <Container>
      <div
        className={css`
          height: 170px;
          display: grid;
          justify-items: center;
        `}
      >
        {user.github_picture ? (
          <Picture src={user.github_picture} />
        ) : (
          <AccountCircle style={iconStyle} />
        )}
        <span
          className={css`
            font-size: 24px;
          `}
        >
          Welcome {user.name}!
        </span>
      </div>
    </Container>
  );
});

const mapStateToProps = (state, ownProps) => {
  const user = state.user;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => ({
  readUser: () => dispatch(userReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
