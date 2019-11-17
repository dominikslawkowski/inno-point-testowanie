import React, { Fragment, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { withRouter } from "react-router-dom";
import config from "../../../config";

import { Form, Container } from "./style";
import Button from "../../Button";
import Spinner from "../../Spinner";
import TextField from "@material-ui/core/TextField";

import { css } from "emotion";

const GlobalStyle = createGlobalStyle`
   body{
    height: 100%;
    overflow: hidden;
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
  }
`;

const LoginForm = withRouter(props => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onLogin = async event => {
    event.preventDefault();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5NzcyMTEsImlhdCI6MTU2MDg1ODI5N30.xg2gFHZHte6f8oOIgED2Aw9jstwAEl3P0k4ABy2ry74"
    );
    props.history.push("/dashboard/projects");
  };

  const onLoginWithGitHub = event => {
    event.preventDefault();
    window.location.assign(`${config.api}/auth`);
    props.setLoading(true);
  };

  return (
    <Container>
      <GlobalStyle />
      <Form gridArea={props.gridArea}>
        <TextField
          label="login"
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          error={error}
          style={{ gridArea: "email", width: "100%" }}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={error}
          style={{ gridArea: "pass", width: "100%" }}
        />
        {props.loading ? (
          <Spinner gridArea="github" alignSelf="end" size={50} />
        ) : (
          <Fragment>
            <Button
              color={true}
              size="large"
              label="Log In"
              alignSelf="end"
              gridArea="button"
              onClick={onLogin}
            />
            <Button
              size="large"
              bcg="hsl(0, 0%, 15%)"
              component={() => (
                <div
                  style={{
                    display: "grid",
                    gridTemplate: '"icon text space" / 2fr 5fr 1fr',
                    alignItems: "center"
                  }}
                >
                  <img
                    src="icons/github.svg"
                    style={{ width: "20px", justifySelf: "end" }}
                  />
                  <span>Login with GitHub</span>
                </div>
              )}
              alignSelf="end"
              gridArea="github"
              onClick={onLoginWithGitHub}
            />
          </Fragment>
        )}
      </Form>
      <div className="Panel">
        <div className="Title">
          <img
            src="/icons/logo.png"
            className={css`
              width: 50px;
            `}
          />
          <span
            className={css`
              font-weight: normal;
            `}
          >
            InnoPoint
          </span>
        </div>
        <div className="Info">
          Welcome back! Log in to your account to view today's projects
        </div>
        <div className="Icons">
          <a>
            <img src="icons/facebook.svg" />
          </a>
          <a>
            <img src="icons/github.svg" />
          </a>
          <a>
            <img src="icons/university.svg" />
          </a>
        </div>
      </div>
    </Container>
  );
});

export { LoginForm };
