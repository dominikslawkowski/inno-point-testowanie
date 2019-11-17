import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { Container } from "./style";
import { Button as DeleteButton } from "../..";
import { Button as EditButton } from "../..";

import { verifyProject } from "../../../api/projects";
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
  withRouter(({ id, history, enqueueSnackbar, gridArea }) => {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
      setOpen(true);
    }

    function handleClose() {
      setOpen(false);
    }

    function handleVerify() {
      verifyProject(id).then(() => {
        history.push("/dashboard/projects");
        enqueueSnackbar("Topic has been verified!", {
          variant: "info"
        });
      });
    }
    return (
      <Container gridArea={gridArea}>
        <div className="Main">
          <div className="Label">Verify this project</div>
          <div className="Info">
            You can accept this project, teams will be able to join it.
          </div>
          <DeleteButton
            label="Verify"
            size="small"
            color="blue"
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
                Teams will be able to join projects
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                <span style={{ color: "gray" }}>Back</span>
              </Button>
              <Button onClick={handleVerify} color="primary">
                Verify
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  })
);
