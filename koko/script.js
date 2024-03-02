function createTasksToDayInCalendar() {
	popUpInputAddBtn.addEventListener("click", () => {
		const taskText = popUpInput.value.trim();
		if (taskText) {
			const dayClicked = choosenDayDate.innerHTML;
			const newTask = {
				text: taskText,
				completed: false, // Początkowo zadanie jest niezaznaczone
			};
			if (!taskByDate[dayClicked]) {
				taskByDate[dayClicked] = [];
			}
			taskByDate[dayClicked].push(newTask);
			addTaskToList(newTask); // Dodaj zadanie do listy na ekranie
			popUpInput.value = "";
		} else {
			popUpInputError.textContent = "Error!";
		}
	});
}

function addTaskToList(task) {
	const newTaskElement = document.createElement("li");
	newTaskElement.textContent = task.text;
	newTaskElement.classList.add("task");
	if (task.completed) {
		newTaskElement.classList.add("mark-line");
	}
	const btnContainer = createButtonsForTasks(task);
	newTaskElement.appendChild(btnContainer);
	taskList.appendChild(newTaskElement);
}

function markTask(taskElement, task) {
	task.completed = !task.completed;
	if (task.completed) {
		taskElement.classList.add("mark-line");
	} else {
		taskElement.classList.remove("mark-line");
	}
	saveTasksToLocalStorage(); // Zapisz zmiany do localStorage
}

function deleteTask(taskElement, task, taskIndex) {
	taskElement.remove();
	const dayClicked = choosenDayDate.innerHTML;
	taskByDate[dayClicked].splice(taskIndex, 1);
	saveTasksToLocalStorage(); // Zapisz zmiany do localStorage
}

function editTask(taskElement, task, newText) {
	taskElement.textContent = newText;
	task.text = newText;
	saveTasksToLocalStorage(); // Zapisz zmiany do localStorage
}

function createButtonsForTasks(task) {
	const btnContainer = document.createElement("div");
	btnContainer.classList.add("btn-container");

	const markBtn = document.createElement("button");
	markBtn.textContent = "Mark";
	markBtn.addEventListener("click", () => markTask(taskElement, task));

	const editBtn = document.createElement("button");
	editBtn.textContent = "Edit";
	editBtn.addEventListener("click", () => {
		const newText = prompt("Enter new text for the task:", task.text);
		if (newText !== null && newText.trim() !== "") {
			editTask(taskElement, task, newText.trim());
		}
	});

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete";
	deleteBtn.addEventListener("click", () => deleteTask(taskElement, task));

	btnContainer.appendChild(markBtn);
	btnContainer.appendChild(editBtn);
	btnContainer.appendChild(deleteBtn);

	return btnContainer;
}
