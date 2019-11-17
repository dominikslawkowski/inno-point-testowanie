import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

class MailButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get("/sendMail").then(response => console.log(response));
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Send Mail
        </Button>
      </div>
    );
  }
}

export default MailButton;
