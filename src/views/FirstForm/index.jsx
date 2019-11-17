import React, { useEffect, useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Spinner from "../../components/Spinner";
import {
  textFieldValidator,
  emailFieldValidator
} from "../../utils/validators";
import Button from "../../components/Button";
import { css } from "emotion";
import axios from "axios";
import config from "../../config";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const show = keyframes`
  from {
    transform: translateY(100px);
    opacity: .2;
  }
`;

const Form = styled.form`
  height: 450px;
  display: grid;
  grid-template: "label label" 50px ". ." 1px "name surname" 20px ". ." 20px "email email" 20px ". ." 20px "email2 email2" 20px "button button" auto "space space" 7px / 200px 200px;
  grid-gap: 10px;
  background-color: transparent;
  padding: 10px;
  justify-items: center;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  @media (max-width: 400px) {
    margin-left: 15px;
    margin-right: 15px;
    grid-template: "label" 50px "." 1px "name" "surname" "." "email" "." "email2" "button" auto;
  }

  a.SingIn {
    grid-area: singin;
    color: #203870;
    cursor: pointer;
  }
`;

const containerStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${show} 0.5s;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: url("photos/bcg-new.png");
  @media (max-width: 400px) {
    background: none;
  }
  background-position: center;
  background-size: 100% 100%;
  background-color: hsl(0, 0%, 90%);

  @media (max-width: 650px) {
    border-radius: 8px;
  }
`;

export default withSnackbar(
  withRouter(props => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      name: urlParams.get("name") !== "null" ? urlParams.get("name") : "",
      email:
        urlParams.get("email") !== "null"
          ? urlParams.get("email") !== "null"
          : "",
      token: urlParams.get("token")
    };

    useEffect(() => {
      if (!params.token) {
        props.history.push("/");
      } else {
        localStorage.setItem("token", params.token);
      }
    }, []);

    const [name, setName] = useState(params.name || "");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState(params.email || "");
    const [email2, setEmail2] = useState(params.email || "");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async event => {
      event.preventDefault();
      const check =
        textFieldValidator(name) ||
        textFieldValidator(surname) ||
        emailFieldValidator(email) ||
        emailFieldValidator(email2) ||
        email !== email2;

      setError(check);
      if (!check) {
        setLoading(true);
        props.enqueueSnackbar("We are completing your profile.", {
          variant: "info"
        });

        axios
          .put(`${config.api}/user/updateInfo`, {
            token: params.token,
            name,
            surname,
            email
          })
          .then(() => {
            props.enqueueSnackbar("Profile updated!", {
              variant: "success"
            });
            setLoading(false);
            props.history.push("/loading");
          })
          .catch(() => {
            props.enqueueSnackbar("Something goes wrong :(", {
              variant: "error"
            });
            setLoading(false);
          });
      }
    };

    return (
      <div className={containerStyle}>
        <Form gridArea={props.gridArea} onSubmit={onSubmit}>
          <div
            className={css`
              width: 100%;
              grid-area: label;
              font-weight: bold;
              padding: 10px;
              font-size: 20px;
              border-bottom: solid 2px #003877;
            `}
          >
            Fill in the profile data
          </div>
          <TextField
            label="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            error={error}
            className={css`
              grid-area: name;
            `}
          />
          <TextField
            label="surname"
            type="text"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            error={error}
            className={css`
              grid-area: surname;
            `}
          />
          <TextField
            label="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={error}
            className={css`
              grid-area: email;
            `}
          />
          <TextField
            label="retype email"
            type="text"
            value={email2}
            onChange={e => setEmail2(e.target.value)}
            error={error}
            className={css`
              grid-area: email2;
            `}
          />
          {loading ? (
            <Spinner gridArea="button" alignSelf="end" size={50} />
          ) : (
            <Button
              color={true}
              size="large"
              label="Complite "
              alignSelf="end"
              gridArea="button"
            />
          )}
        </Form>
      </div>
    );
  })
);
