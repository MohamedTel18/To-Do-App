import './styles.css';
import {getProjects,
    AddProject,
    UpdateProject,
    DeleteProject,
    getTodos,
    AddTodo,
    UpdateTodo,
    DeleteTodo
} from './CRUDop.js'




addEventListener('DOMContentLoaded', () => {
    class Todo {
        constructor(title, description, dueDate) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
        }
    }
    let currentProjectName = '';

    const CheckBox = document.createElement('input');
    CheckBox.type = 'checkbox';
    const todosContainer = document.getElementById('todos');
    const DeleteTodoBtn = document.getElementById('delete-todo-btn');
    const AddTodoBtn = document.getElementById('add-todo-btn');
    const AddTaskForm = document.getElementById('taskModal');
    const submitTaskBtn = document.getElementById('saveTaskBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const Container = document.getElementById('projects');
    const cancelBtn = document.getElementById('cancelBtn');
    const submitBtn = document.getElementById('submitBtn');
    const ProjectName = document.getElementById('itemName');
    const ProjectDescription = document.getElementById('itemDescription');
    const btn = document.getElementById('add-project-btn');
    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
    
    
    btn.onclick = () => {
    alert('Add a new project');
    modalOverlay.style.display = 'block';
    };

    submitBtn.onclick = () =>  {
            AddProject(ProjectName.value, ProjectDescription.value);
            modalOverlay.style.display = 'none';
            RenderSideBar();
        }    


    cancelBtn.onclick = () => {
        modalOverlay.style.display = 'none';
    };

    const RenderSideBar =() => {
        
        alert("it Works!");

        getProjects().forEach((project) => {
            
            const pBtn = document.createElement('button');
            pBtn.textContent = project.name;
            pBtn.style.backgroundColor = 'lightblue';
            pBtn.onclick = () => {
                currentProjectName = project.name; // Store current project
                renderTodos(project.name);
            };
            Container.appendChild(pBtn);
        });


    };

    const renderTodos = (projectName) => {
        const project = getProjects().find(p => p.name === projectName);
        if(!project) {
            return;
        }

        getTodos(projectName).forEach(todo => {
            const Item= document.createElement('div');
            Item.classList.add('todo-item');
            Item.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <p>Due: ${todo.dueDate}</p>
                <p>Priority: ${todo.priority}</p>
                <p>Status: ${todo.IsCompleted ? 'Completed' : 'Pending'}</p>
                <button id="delete-todo-btn" ><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="currentColor" d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg></button>
            `;
            
            todosContainer.appendChild(Item);
            document.getElementById('delete-todo-btn').addEventListener('click', () => {
                DeleteTodo(currentProjectName,todo.title);
                todosContainer.removeChild(Item);
            });
            
        });
    };

    AddTodoBtn.onclick = () => {
        document.getElementById('form-Task').style.display = 'block';
    };

    submitTaskBtn.onclick = () => {
        document.getElementById('form-Task').style.display = 'none';
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDate').value;

        if(currentProjectName === '') {
            alert('Please select a project first.');
            return;
        }

        AddTodo(currentProjectName, new Todo(title, description, dueDate));
        AddTaskForm.style.display = 'none';
        renderTodos(currentProjectName);
    };

    cancelTaskBtn.onclick = () => {
        document.getElementById('form-Task').style.display = 'none';
    }

    

    RenderSideBar();    
});