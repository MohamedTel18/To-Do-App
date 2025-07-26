// Save and load projects to/from localStorage
export const saveProjects = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

export const loadProjects = () => {
  return JSON.parse(localStorage.getItem("projects")) || [];
};