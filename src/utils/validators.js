import validator from "validator";

export const textFieldValidator = value => {
  if (!value || !/\S/.test(value)) {
    return true;
  }
  return false;
};

export const emailFieldValidator = value => {
  if (!value || !/\S/.test(value)) {
    return true;
  }
  if (!validator.isEmail(value)) {
    return true;
  }
  return false;
};

export const textAreaValidator = value => {
  if (!value || !/\S/.test(value)) {
    return true;
  } else if (value.length > 1000) {
    return true;
  } else if (!/^[A-Za-z0-9 ,.'\-()!?]*$/.test(value)) {
    return true;
  }
  return false;
};

export const textEmailValidator = value => {
  return validator.isEmail(value);
};
