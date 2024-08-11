document.addEventListener('DOMContentLoaded', () => {
    const projectsList = document.getElementById('projectsList');
    const addProjectBtn = document.getElementById('addProjectBtn');

    // Load projects from local storage
    const loadProjects = () => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projectsList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.url}" target="_blank">View Project</a>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            projectsList.appendChild(projectItem);
        });
    };

    // Add new project
    const addProject = (title, description, url) => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push({ title, description, url });
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    };

    // Delete project
    const deleteProject = (index) => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    };

    // Event listener for adding a new project
    addProjectBtn.addEventListener('click', () => {
        const title = prompt('Enter the project title:');
        const description = prompt('Enter the project description:');
        const url = prompt('Enter the project URL:');
        if (title && description && url) {
            addProject(title, description, url);
        }
    });

    // Event listener for deleting a project
    projectsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteProject(index);
        }
    });

    // Initial load
    loadProjects();
});
