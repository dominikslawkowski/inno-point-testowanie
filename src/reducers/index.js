import projectsReducer from "./projects";
import teamsReducer from "./teams";
import usersReducer from "./users";
import userReducer from "./user";
import newsReducer from "./news";

const rootReducer = {
  projects: projectsReducer,
  teams: teamsReducer,
  users: usersReducer,
  user: userReducer,
  news: newsReducer
};

export default rootReducer;
