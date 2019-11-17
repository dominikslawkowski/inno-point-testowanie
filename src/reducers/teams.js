import { createReducer } from "redux-starter-kit";
import AT from "../actions/actionsTypes";
import produce from "immer";

const teams = {
  isFetching: false,
  items: []
};

const teamsReducer = createReducer(teams, {
  [AT.TEAMS_READ_REQUEST]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = true;
    });
  },
  [AT.TEAMS_READ_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
      draft.items = action.payload;
    });
  },
  [AT.TEAMS_READ_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
    });
  },
  [AT.TEAM_READ_REQUEST]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = true;
    });
  },
  [AT.TEAM_READ_SUCCESS]: (state, action) => {
    const { id } = action.payload;
    return produce(state, draft => {
      draft.isFetching = false;
      draft.items[id] = {};
    });
  },
  [AT.TEAM_READ_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
    });
  }
});

export default teamsReducer;
