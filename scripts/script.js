// Define global variables that will be used in diffrent functions 

let tasks ;
localStorage.getItem('tasks')?tasks=JSON.parse(localStorage.getItem('tasks')) :tasks=[] ;
let taskIndex;
localStorage.getItem('taskIndex')? taskIndex = Number(localStorage.getItem('taskIndex')) : taskIndex=0 ;
const addTaskBtn = document.querySelector("button.add-task");
const taskSection = document.querySelector('section.tasks-sec');
// Define a function to add a task to the list
const addTask = ()=> {
 
   let desc = document.querySelector('input#task-desc').value ;
      if(desc!==""){
   let task = {desc:desc,completed:false ,id:++taskIndex};
   tasks.push(task);
   // Save the task list to local storage and the taskindex 
   localStorage.setItem('tasks', JSON.stringify(tasks));
   localStorage.setItem('taskIndex', taskIndex.toString());
   // Clear the input field
   document.querySelector('input#task-desc').value = '';
   displayTasks();
  }

    }
  // Define a function to display tasks in the list
const displayTasks = () => {
    taskSection.innerHTML = '';  // Clear the existing task list
    let tasksFragment = document.createDocumentFragment();

    tasks.forEach((task, index) => {
        let taskE = document.createElement('div');
        taskE.classList.add('task-card');
        taskE.setAttribute('data-id', task.id);
        taskE.innerHTML = `
            <p class="task-info">
                #${task.id}
                <span class="desc ${task.completed ? 'completed' : ''}">${task.desc}</span>
            </p>
            <div class="actions">
                <input type="checkbox" onclick='completeTask(${task.id})' name="toggle-complete" class="toggle-complete" id="toggle-complete-${task.id}" ${task.completed ? 'checked' : ''}>
                <button class="edit btn" onclick='editTask(${task.id})' >Edit</button>
                <button class="delete-task btn"  onclick='deleteTask(${task.id})'>Delete</button>
            </div>
        `;

        tasksFragment.appendChild(taskE);
    });

    taskSection.appendChild(tasksFragment);  // Append the fragment with all tasks to the task section
};

    // Define a function to handle task completion
    const completeTask = (taskId) => {
        // Find the task by its id
        const taskIndex = tasks.findIndex(task => task.id === taskId);
    // toggle 
        if (taskIndex !== -1) {
            let task = tasks[taskIndex];
            task.completed = !task.completed;
            tasks[taskIndex] = task;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        } else {
           return false;
        }
    };
    

    const editTask = (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex !== -1) {
            let task = tasks[taskIndex];
            let taskE = document.querySelector(`.task-card[data-id="${id}"]`);
            taskE.classList.add('edit-mode');
           
            taskE.innerHTML = `
                <input type="text" class="task-input" value="${task.desc}">
                <button class="save-task btn">Save</button>
                <button class="cancel-task btn">Cancel</button>
            `;
            taskE.querySelector('.task-input').focus();
            taskE.querySelector('.save-task').addEventListener('click', () => {
                taskE.classList.remove('edit-mode');
                task.desc = taskE.querySelector('.task-input').value;  
                localStorage.setItem('tasks', JSON.stringify(tasks));  
                displayTasks();  
            });
    
            taskE.querySelector('.cancel-task').addEventListener('click', () => {
              taskE.classList.remove('edit-mode');
                taskE.innerHTML = `
                    <p class="task-info">
                        #${task.id}
                        <span class="desc ${task.completed ? 'completed' : ''}">${task.desc}</span>
                    </p>
                    <div class="actions">
                        <input type="checkbox" onclick="completeTask(${task.id})" name="toggle-complete" class="toggle-complete" id="toggle-complete-${task.id}" ${task.completed ? 'checked' : ''}>
                        <button class="edit btn" onclick="editTask(${task.id})">Edit</button>
                        <button class="delete-task btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                
            });
        } else {
            console.error(`Task with id ${id} not found.`);
        }
    };
    
    const deleteTask = (id) => {
        // Find the task index by id
        const taskIndex = tasks.findIndex(task => task.id === id);
        // Check if the task exists
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);  
            localStorage.setItem('tasks', JSON.stringify(tasks));  
            displayTasks();  
        } else {
            return false;  
        }
    };
    
addTaskBtn.addEventListener('click',addTask);

displayTasks();


