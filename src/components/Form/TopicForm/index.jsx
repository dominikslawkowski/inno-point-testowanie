import React, { useState } from "react";
import { withSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import MenuItem from "@material-ui/core/MenuItem";

import { Form, Container, StyledSpinner } from "./style";
import Button from "../../Button";
import ColorPicker from "../../ColorPicker";

import { createProject } from "../../../api/projects";

import { textFieldValidator } from "../../../utils/validators";
import { css } from "emotion";

const TopicForm1 = props => {
  const [name, setName] = useState({
    value: "",
    error: false
  });

  const [number, setNumber] = useState({
    value: "",
    error: false
  });

  const [description, setDescription] = useState({
    value: "",
    error: false
  });

  const [themeColor, setThemeColor] = useState({
    value: "",
    error: false
  });

  const resetValues = () => {
    const clearState = { value: "", error: false };
    setName(clearState);
    setNumber(clearState);
    setDescription(clearState);
    setThemeColor(clearState);
    setTags([]);
  };

  const [tags, setTags] = useState([]);

  const [waiting, setWaiting] = useState(false);

  const returnValue = (value, validator) => ({
    value,
    error: validator ? validator(value) : false
  });

  const handleAddChip = chip => setTags([...tags, chip]);

  const handleDeleteChip = (chip, index) =>
    setTags(tags.filter((e, i) => i !== index));

  const handleSubmit = async event => {
    const fields = [name, number, description];
    const mathods = [setName, setNumber, setDescription];
    event.preventDefault();
    if (fields.every(e => !e.error && e.value)) {
      const project = {
        name: name.value,
        number_of_members: number.value,
        short_description: description.value,
        tags: tags.join(","),
        theme_color: themeColor.value
      };
      setWaiting(true);
      createProject(project).then(() => {
        const { setUpdate, update } = props;
        setUpdate(!update);
        props.handleClose();
        props.enqueueSnackbar("Project has been sent to verify!", {
          variant: "info"
        });
        resetValues();
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
          <div className="Title">Topic Details</div>
          {[
            {
              label: "Name",
              value: name.value,
              onChange: event =>
                setName(returnValue(event.target.value, textFieldValidator)),
              error: name.error,
              style: { gridArea: "name" }
            },
            {
              label: "Number of Students",
              value: number.value,
              onChange: event =>
                setNumber(returnValue(event.target.value, textFieldValidator)),
              error: number.error,
              type: "number",
              style: { gridArea: "number" }
            },
            {
              label: "Short description",
              value: description.value,
              onChange: event =>
                setDescription(
                  returnValue(event.target.value, textFieldValidator)
                ),
              error: description.error,
              multiline: true,
              rows: 6,
              style: { gridArea: "desc" }
            }
          ].map((props, index) => (
            <TextField {...props} key={index} variant="outlined" />
          ))}
          <ChipInput
            key="chipsinput"
            value={tags}
            onAdd={chip => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            style={{ gridArea: "chips" }}
            label="Tags"
          />
          <ColorPicker
            gridArea={"colors"}
            color={themeColor.value}
            onChange={color =>
              setThemeColor({ value: color.hex, error: false })
            }
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
              className={css`
                justify-self: end;
                align-self: end;
                @media (max-width: 400px) {
                  justify-self: center;
                }
              `}
            />
          )}
        </Form>
      </div>
    </Container>
  );
};

const TopicForm = withSnackbar(TopicForm1);

export { TopicForm };
