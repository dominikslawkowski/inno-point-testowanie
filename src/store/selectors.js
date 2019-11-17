export const getVerifiedProjects = state => {
  const projects = state.projects.items;
  const verifiedProjects =
    projects.length !== 0 ? projects.filter(e => e.verificated) : [];

  return verifiedProjects;
};

export const getUnverifiedProjects = state => {
  const projects = state.projects.items;
  const unverifiedProjects =
    projects.length !== 0 ? projects.filter(e => !e.verificated) : [];

  return unverifiedProjects;
};

export const getProjectById = (state, id) => {
  const projects = state.projects.items;
  const project = projects.length !== 0 ? projects.find(e => e.id == id) : [];

  return project;
};
