import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { Container } from "./style";
import { Button as DeleteButton } from "../..";
import { Button as EditButton } from "../..";

import { joinTeam } from "../../../api/teams";
import { TeamForm } from "../../../components";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default withSnackbar(
  withRouter(
    ({
      id,
      history,
      enqueueSnackbar,
      gridArea,
      makeUpdate,
      belong,
      freeSpot
    }) => {
      const [open, setOpen] = useState(false);

      function handleClickOpen() {
        setOpen(true);
      }

      function handleClose() {
        setOpen(false);
      }

      function handleVerify() {
        joinTeam(id, belong).then(() => {
          enqueueSnackbar(
            belong ? "You left the team" : "You joined the team!",
            {
              variant: belong ? "warning" : "success"
            }
          );
          makeUpdate();
          setOpen(false);
        });
      }
      return (
        <Container gridArea={gridArea}>
          <div className="Main">
            <div className="Label">
              {belong
                ? "Leave this team"
                : freeSpot
                ? "Join this team"
                : "Team is full"}
            </div>
            <div className="Info">
              {belong
                ? "You can leave this team"
                : freeSpot
                ? "You can become a member of the team"
                : "There is now free spot in this team"}
            </div>
            <DeleteButton
              label={belong ? "Leave" : "Join"}
              size="small"
              color="blue"
              disabled={belong ? false : !freeSpot}
              gridArea="button"
              style={{ justifySelf: "right", alignSelf: "end" }}
              onClick={handleClickOpen}
            />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {belong ? "Leaving the team" : "Joining the team"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  <span style={{ color: "gray" }}>Back</span>
                </Button>
                <Button onClick={handleVerify} color="primary">
                  {belong ? "Leave" : "Join"}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      );
    }
  )
);
