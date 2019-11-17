import { createReducer } from "redux-starter-kit";
import AT from "../actions/actionsTypes";
import produce from "immer";

const news = {
  isFetching: false,
  items: []
};

const projectsReducer = createReducer(news, {
  [AT.NEWS_READ_REQUEST]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = true;
    });
  },
  [AT.NEWS_READ_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
      draft.items = action.payload;
    });
  },
  [AT.NEWS_READ_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
    });
  }
});

export default projectsReducer;
