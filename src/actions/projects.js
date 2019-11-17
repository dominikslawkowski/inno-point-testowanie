import { createAction } from "redux-starter-kit";
import AT from "./actionsTypes";

export const projectsReadRequest = createAction(AT.PROJECTS_READ_REQUEST);
export const projectsReadSuccess = createAction(AT.PROJECTS_READ_SUCCESS);
export const projectsReadFailure = createAction(AT.PROJECTS_READ_FAILURE);

export const projectCreateRequest = createAction(AT.PROJECT_CREATE_REQUEST);
