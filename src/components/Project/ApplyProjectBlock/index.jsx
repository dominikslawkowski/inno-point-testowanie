import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

import { Container } from "./style";
import { Button as DeleteButton } from "../..";

import { applyProject } from "../../../api/projects";

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
  withRouter(({ id, history, enqueueSnackbar, gridArea, makeUpdate }) => {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
      setOpen(true);
    }

    function handleClose() {
      setOpen(false);
    }

    function handleDelete() {
      applyProject(id).then(() => {
        // history.push("/dashboard/teams");
        makeUpdate();
        setOpen(false);
        enqueueSnackbar("You apply to the project!", {
          variant: "success"
        });
      });
    }
    return (
      <Container gridArea={gridArea}>
        <div className="Main">
          <div className="Label">Apply to the project</div>
          <div className="Info">You can apply to this project.</div>
          <DeleteButton
            label="Apply"
            size="small"
            color="green"
            gridArea="button"
            style={{ justifySelf: "end", alignSelf: "end" }}
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
                You can apply to this project. You couldn't leave this project
                after that, contact with the admin will be required. Please be
                certain.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Back
              </Button>
              <Button onClick={handleDelete} color="primary">
                <span style={{ color: "green" }}>Apply</span>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  })
);
