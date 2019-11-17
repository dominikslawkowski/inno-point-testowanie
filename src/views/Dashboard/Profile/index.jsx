import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { projectsReadRequest } from "../../../actions";
import { AccountCircle } from "@material-ui/icons";

import { iconStyle, tableStyle, Container, Picture } from "./style";

import { css } from "emotion";

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

  @media (max-width: 400px) {
    display: none;
  }

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

const Profile = props => {
  const { user } = props;
  return (
    <div>
      <TopBar>
        <Label>
          <AccountCircle />
          <span>Profile</span>
        </Label>
      </TopBar>
      <div
        className={css`
          width: 550px;
          height: 400px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 100px;
          min-height: 200px;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
          transition: all 0.1s ease-in-out;
          background-color: white;
          justify-items: center;
          display: grid;
          grid-template: "icon icon" 150px "name name" 30px "email email" "desc desc" "border border" 1px "role role";
          grid-gap: 5px;

          @media (max-width: 400px) {
            width: 230px;
            height: 300px;
            margin-left: 15px;
            margin-right: 15px;
          }
        `}
      >
        {user.github_picture ? (
          <Picture src={user.github_picture} />
        ) : (
          <AccountCircle style={iconStyle} />
        )}
        <span
          className={css`
            grid-area: name;
            justify-self: center;
            font-size: 24px;
          `}
        >
          {user.name} {user.surname}
        </span>
        <span
          className={css`
            grid-area: email;
            justify-self: center;
            font-size: 16px;
            color: hsl(0, 0%, 50%);
          `}
        >
          {user.email}
        </span>
        <span
          className={css`
            grid-area: desc;
            text-align: center;
            justify-self: center;
            font-size: 16px;
            color: hsl(0, 0%, 70%);
          `}
        >
          {user.bio}
        </span>
        <div
          className={css`
            height: 1px;
            width: 100%;
            grid-area: border;
            justify-self: center;
            background-color: #00336e;
          `}
        />
        <span
          className={css`
            grid-area: role;
            justify-self: center;
            align-self: center;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 24px;
            color: #00336e;
          `}
        >
          {user.role}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const user = state.user;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => ({
  readProjects: () => dispatch(projectsReadRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
