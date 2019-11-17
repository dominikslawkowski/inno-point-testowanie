import { createAction } from "redux-starter-kit";
import AT from "./actionsTypes";

export const newsReadRequest = createAction(AT.NEWS_READ_REQUEST);
export const newsReadSuccess = createAction(AT.NEWS_READ_SUCCESS);
export const newsReadFailure = createAction(AT.NEWS_READ_FAILURE);

export const newsUpdateRequest = createAction(AT.NEWS_UPDATE_REQUEST);
export const newsUpdateSuccess = createAction(AT.NEWS_UPDATE_SUCCESS);
export const newsUpdateFailure = createAction(AT.NEWS_UPDATE_FAILURE);

export const newsCreateRequest = createAction(AT.NEWS_CREATE_REQUEST);
