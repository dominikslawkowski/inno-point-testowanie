import { createAction } from "redux-starter-kit";
import AT from "./actionsTypes";

export const usersReadRequest = createAction(AT.USERS_READ_REQUEST);
export const usersReadSuccess = createAction(AT.USERS_READ_SUCCESS);
export const usersReadFailure = createAction(AT.USERS_READ_FAILURE);

export const userReadRequest = createAction(AT.USER_READ_REQUEST);
export const userReadSuccess = createAction(AT.USER_READ_SUCCESS);
export const userReadFailure = createAction(AT.USER_READ_FAILURE);

export const userCreateRequest = createAction(AT.USER_CREATE_REQUEST);
