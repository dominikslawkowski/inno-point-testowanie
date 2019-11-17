import React, { useState } from "react";
import { withSnackbar } from "notistack";
import styled from "styled-components/macro";

import TextField from "@material-ui/core/TextField";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { LockOpen, Lock } from "@material-ui/icons";

import { Form, Container, StyledSpinner, StyledStatusOfTeam } from "./style";
import Button from "../../Button";
import { createTeam } from "../../../api/teams";

import { textFieldValidator } from "../../../utils/validators";

const TopicForm1 = props => {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [typeOfProject, setTypeOfProject] = useState(true);
  const [number, setNumber] = useState({
    value: "",
    error: false
  });

  const [status, setStatus] = useState({
    value: "",
    error: false
  });

  const resetValues = () => {
    const clearState = {
      value: "",
      error: false
    };
    setNumber(clearState);
    setStatus(clearState);
  };

  const [waiting, setWaiting] = useState(false);

  function handleTypeOfProject(event, newValue) {
    setTypeOfProject(newValue);
  }

  const returnValue = (value, validator) => ({
    value,
    error: validator ? validator(value) : false
  });

  const handleSubmit = async event => {
    const fields = [number];
    const mathods = [setNumber];
    event.preventDefault();
    if (fields.every(e => !e.error && e.value)) {
      const team = {
        max_number_of_members: number.value,
        token: localStorage.getItem("token"),
        open: typeOfProject
      };
      setWaiting(true);
      createTeam(team).then(() => {
        const { setUpdate, update } = props;
        setUpdate(!update);
        props.handleClose();
        props.enqueueSnackbar("Team has been created!", {
          variant: "success"
        });
        setWaiting(false);
        resetValues();
      });
    } else {
      mathods.map((e, i) =>
        e(returnValue(fields[i].value, textFieldValidator))
      );
    }
  };

  return (
    <Container>
      <div className="Panel" />
      <div className="FormContainer">
        <Form onSubmit={handleSubmit} gridArea={props.gridArea}>
          <div className="Title">Team Details</div>
          <TextField
            label="Max number of Students"
            value={number.value}
            onChange={event =>
              setNumber(returnValue(event.target.value, textFieldValidator))
            }
            error={number.error}
            type="number"
            style={{ gridArea: "number" }}
            variant="outlined"
          />
          <StyledStatusOfTeam
            style={{ gridArea: "status" }}
            value={typeOfProject}
            onChange={handleTypeOfProject}
          >
            <BottomNavigationAction
              label="Open"
              value={true}
              icon={<LockOpen />}
            />
            <BottomNavigationAction
              label="Close"
              value={false}
              icon={<Lock />}
            />
          </StyledStatusOfTeam>
          {waiting ? (
            <StyledSpinner
              size={30}
              gridArea="button"
              style={{
                justifySelf: "end",
                alignSelf: "end",
                marginRight: "70px"
              }}
            />
          ) : (
            <Button
              key="button"
              size="small"
              label="Submit"
              gridArea="button"
              color={"true"}
              style={{ justifySelf: "end", alignSelf: "end" }}
            />
          )}
        </Form>
      </div>
    </Container>
  );
};

const TeamForm = withSnackbar(TopicForm1);

export { TeamForm };
