import React, { useState } from "react";
import { withSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";

import { Form, Container, StyledSpinner, StyledStatusOfTeam } from "./style";
import Button from "../../Button";
import { createNews } from "../../../api/news";

import { textFieldValidator } from "../../../utils/validators";

const TopicForm1 = props => {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [typeOfProject, setTypeOfProject] = useState(true);
  const [title, setTitle] = useState({
    value: "",
    error: false
  });

  const [body, setBody] = useState({
    value: "",
    error: false
  });

  const [waiting, setWaiting] = useState(false);

  function handleTypeOfProject(event, newValue) {
    setTypeOfProject(newValue);
  }

  const returnValue = (value, validator) => ({
    value,
    error: validator ? validator(value) : false
  });

  const handleSubmit = async event => {
    const fields = [title, body];
    const mathods = [setTitle];
    event.preventDefault();
    if (fields.every(e => !e.error && e.value)) {
      const post = {
        title: title.value,
        token: localStorage.getItem("token"),
        body: body.value
      };
      setWaiting(true);
      createNews(post).then(() => {
        const { setUpdate, update } = props;
        setUpdate(!update);
        props.handleClose();
        props.enqueueSnackbar("Post has been created!", {
          variant: "success"
        });
        setWaiting(false);
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
          <div className="Title">Post Details</div>
          <TextField
            label="Title"
            value={title.value}
            onChange={event =>
              setTitle(returnValue(event.target.value, textFieldValidator))
            }
            error={title.error}
            type="text"
            style={{ gridArea: "posttitle" }}
            variant="outlined"
          />
          <TextField
            label="Body"
            multiline={true}
            rows={12}
            style={{ gridArea: "body" }}
            value={body.value}
            onChange={event =>
              setBody(returnValue(event.target.value, textFieldValidator))
            }
            error={body.error}
            type="text"
            style={{ gridArea: "body" }}
            variant="outlined"
          />
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

const PostForm = withSnackbar(TopicForm1);

export { PostForm };
