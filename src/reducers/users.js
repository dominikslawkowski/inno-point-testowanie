import { createReducer } from "redux-starter-kit";
import AT from "../actions/actionsTypes";
import produce from "immer";

const users = {
  isFetching: false,
  items: []
};

const usersReducer = createReducer(users, {
  [AT.USERS_READ_REQUEST]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = true;
    });
  },
  [AT.USERS_READ_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
      draft.items = action.payload;
    });
  },
  [AT.USERS_READ_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
    });
  }
});

export default usersReducer;
