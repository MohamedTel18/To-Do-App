import {saveProjects,loadProjects} from './storage.js';

let projects = loadProjects();

export const getProjects = () => {
    return projects;
};

export const AddProject =(ProjectName,ProjectDescription) =>{
    const newProject ={
        name: ProjectName,
        description: ProjectDescription,
        todos : []
    }
    projects.push(newProject);
    saveProjects(projects);
};

export const UpdateProject = (oldname, newname, newdescription) => {
    const project = projects.find(p => p.name === oldname);
    if (project) {
        project.name = newname;
        project.description = newdescription;
        saveProjects(projects);
    }
};

export const DeleteProject = (projectName) => {
    projects = projects.filter(p => p.name !== projectName);
    saveProjects(projects);
};

export const getTodos = (projectName) => {
    const project = projects.find(p => p.name === projectName);
    return project ? project.todos : [];
};

export const AddTodo = (projectName, todo) => {
    const project = projects.find(p => p.name === projectName);
    if (project) {
        project.todos.push(todo);
        saveProjects(projects);
    }
};

export const UpdateTodo = (projectName, Title, newTodo) => {
    const project = projects.find(p=> p.name === projectName);
    if (!project) {
        return;
    }
    const todoIndex = project.todos.findIndex(t => t.title === Title);
    if (todoIndex !== -1) {
        project.todos[todoIndex] = newTodo;
        saveProjects(projects);
    }
};

export const DeleteTodo = (projectName, todoTitle) => {
    const project = projects.find(p => p.name === projectName);
    if (project) {
        project.todos = project.todos.filter(t => t.title !== todoTitle);
        saveProjects(projects);
    }
};