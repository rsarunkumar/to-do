

/* ===== TOGGLE TASK FORM ===== */
function toggleForm() {
    document.getElementById("taskForm").classList.toggle("show");
}

/* ===== ADD TASK (Updated) ===== */
/* ===== UPDATED ADD TASK ===== */
function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();

    if (!name) return;

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox" onclick="toggleComplete(this)">
            <div class="task-text">
                <h4>${name}</h4>
                <p>${desc}</p>
            </div>
        </div>
        <div class="action">
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">x</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(task);

    // Reset form
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskForm").classList.remove("show");
}

/* ===== UPDATED: MOVE TASK & HIDE BUTTONS ===== */
function toggleComplete(checkbox) {
    const taskElement = checkbox.closest('.task');
    const taskText = taskElement.querySelector('.task-text');
    const actionButtons = taskElement.querySelector('.action'); // Find the buttons
    const activeList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    if (checkbox.checked) {
        // 1. Move to completed box
        taskText.classList.add("completed-text");
        completedList.appendChild(taskElement);
        
        // 2. Hide the action buttons (Edit/Delete)
        if (actionButtons) {
            actionButtons.style.display = "none";
        }
    } else {
    // Move back to active box
    taskText.classList.remove("completed-text");
    activeList.appendChild(taskElement);
    
    // Ensure this matches the CSS display type
    if (actionButtons) {
        actionButtons.style.display = "flex"; 
    }
}
}

let msg = document.getElementById("taskName");

 msg.addEventListener('keypress', function (e) {
        if (e.key === "Enter"){
            addTask();
        }
    });

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const title = task.querySelector("h4");

    // Create an input box
    const input = document.createElement("input");
    input.type = "text";
    input.value = title.textContent;
    input.className = "edit-input";

    // Replace h4 with input
    title.replaceWith(input);
    input.focus();

    // Save when Enter is pressed
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            saveEdit();
        }
    });

    // Save when input loses focus
    input.addEventListener("blur", saveEdit);

    function saveEdit() {
        const newTitle = document.createElement("h4");
        newTitle.textContent = input.value.trim() || "Untitled Task";
        input.replaceWith(newTitle);
    }
}


/* ===== COMPLETED TASK PAGE (placeholder) ===== */
function showtask() {
    alert("Completed tasks feature coming soon!");
}

const sidebar = document.getElementById("sidebar");

function toggleSidebar(event) {
    event.stopPropagation(); // prevent body click
    sidebar.classList.toggle("show");
}

function hideSidebar() {
    sidebar.classList.remove("show");
}

// close sidebar when clicking anywhere
document.addEventListener("click", hideSidebar);

// prevent closing when clicking inside sidebar
sidebar.addEventListener("click", function (event) {
    event.stopPropagation();
});

// Select the sidebar profile h3 and header h2
const profileName = document.querySelector(".profile h3");
const headerH2 = document.querySelector("header h2");

// Function to make a h3 editable
function makeH3Editable(h3) {
    h3.addEventListener("dblclick", function editName() {
        const currentName = h3.textContent;

        // Create input element
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentName;
        input.className = "edit-profile-name";

        // Replace h3 with input
        h3.replaceWith(input);
        input.focus();

        // Function to save name
        function saveName() {
            const newName = input.value.trim() || "User";

            // Create new h3 and replace input
            const newH3 = document.createElement("h3");
            newH3.textContent = newName;
            input.replaceWith(newH3);

            // Reattach double-click listener
            makeH3Editable(newH3);

            // Update header h2 greeting
            updateHeaderGreeting(newName);
        }

        // Save on Enter key
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                saveName();
            }
        });

        // Save on blur (click outside)
        input.addEventListener("blur", saveName);
    });
}

// Function to update header greeting
function updateHeaderGreeting(name) {
    headerH2.textContent = `Welcome, ${name} 👋`;
}

// Initialize
makeH3Editable(profileName);