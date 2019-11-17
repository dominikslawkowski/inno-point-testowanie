import { createReducer } from "redux-starter-kit";
import AT from "../actions/actionsTypes";
import produce from "immer";

const user = {
  isFetching: false,
  name: null,
  surname: null,
  isAuthenticated: false,
  picture: null,
  email: null,
  token: localStorage.getItem("token") || null
};

const usersReducer = createReducer(user, {
  [AT.USER_READ_REQUEST]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = true;
    });
  },
  [AT.USER_READ_SUCCESS]: (state, action) => {
    const {
      id,
      name,
      surname,
      github_picture,
      email,
      team_id,
      token,
      role,
      bio
    } = action.payload;
    return produce(state, draft => {
      draft.isFetching = false;
      draft.id = id;
      draft.name = name;
      draft.surname = surname;
      draft.github_picture = github_picture;
      draft.email = email;
      draft.team_id = team_id;
      draft.token = token;
      draft.role = role;
      draft.bio = bio;
    });
  },
  [AT.USER_READ_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft.isFetching = false;
    });
  }
});

export default usersReducer;
