let nav = 0;
let taskByDate = {};
let id = 1;

const listOfDays = document.querySelector(".main__list-of-days");
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday ", "Sunday "];
const popUp = document.querySelector(".popup");
const choosenDayDate = document.querySelector(".popup__choosen-day-date");

const closePopUpBTN = document.querySelector(".popup__cancel-btn");
const popUpInput = document.querySelector(".popup__input");
const popUpInputAddBtn = document.querySelector(".popup__input-add-btn");
const popUpInputError = document.querySelector(".popup__input-error");
const taskList = document.querySelector(".popup__task-list");
const popUpEditTask = document.querySelector(".popup__edit-task");
const popUpEditInput = document.querySelector(".popup__input-edit-task");
const popUpEditAcceptBtn = document.querySelector(".popup__accept-edit-btn");
const popUpEditCancelBtn = document.querySelector(".popup__cancel-edit-btn");
const backgroundShadow = document.querySelector(".bg-shadow");

function openPopUp(dayClicked) {
	popUp.classList.add("display-block");
	backgroundShadow.classList.add("display-block");
	showTasksForDay(dayClicked);
}

function closePopUp() {
	const closePopUpBTN = document.querySelector(".popup__cancel-btn").addEventListener("click", () => {
		popUp.classList.remove("display-block");
		backgroundShadow.classList.remove("display-block");
	});
}
closePopUp();

function loadCalendar() {
	const date = new Date();

	if (nav !== 0) {
		date.setMonth(new Date().getMonth() + nav);
	}

	const month = date.getMonth();
	const year = date.getFullYear();
	const firstDayOfMonth = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const dateForString = firstDayOfMonth.toLocaleDateString("en-gb", {
		weekday: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	const paddingDays = weekDays.indexOf(dateForString.split(", ")[0]);
	const nameOfMonth = (document.querySelector(".name-of-month").innerHTML = `${date.toLocaleDateString("en-gb", {
		month: "long",
		year: "numeric",
	})}`);

	listOfDays.innerHTML = "";

	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const dayLi = document.createElement("li");
		dayLi.classList.add("main__day-of-month");
		dayLi.setAttribute("data-date", new Date(year, month, i - paddingDays).toLocaleDateString());

		if (i > paddingDays) {
			dayLi.innerHTML = i - paddingDays;

			dayLi.addEventListener("click", () => {
				const dayClicked = dayLi.getAttribute("data-date");
				choosenDayDate.innerHTML = dayClicked;
				openPopUp(dayClicked);
			});
		} else {
			dayLi.classList.add("main__empty-field-of-day");
		}
		listOfDays.appendChild(dayLi);
	}
}
loadCalendar();

function createTasksToDayInCalendar() {
	popUpInputAddBtn.addEventListener("click", () => {
		const taskData = {
			task: popUpInput.value,
			completed: false,
		};
		const dayClicked = choosenDayDate.innerHTML;

		if (popUpInput.value === "") {
			popUpInputError.textContent = "Error!";
			return;
		}
		popUpInputError.textContent = "";

		if (taskByDate.completed) {
			task.classList.add("mark-line");
		}

		if (!taskByDate[dayClicked]) {
			taskByDate[dayClicked] = [];
		}
		taskByDate[dayClicked].push(taskData);

		popUpInput.value = "";
		taskList.innerHTML = "";

		taskByDate[dayClicked].forEach(taskData => {
			const task = document.createElement("li");
			task.classList.add("task");
			task.innerHTML = taskData.task;

			taskList.appendChild(task);
			createButtonsForTasks(task);
		});
	});
}
createTasksToDayInCalendar();

function showTasksForDay(dayClicked) {
	taskList.innerHTML = "";
	if (taskByDate[dayClicked]) {
		taskByDate[dayClicked].forEach(taskData => {
			const newTask = document.createElement("li");
			newTask.classList.add("task");
			newTask.innerHTML = taskData.task;
			if (taskData.completed) {
				newTask.classList.add("mark-line");
			}
			taskList.appendChild(newTask);
			createButtonsForTasks(newTask);
		});
	}
}

const markTask = task => {
	task.classList.toggle("mark-line");
	const dayClicked = choosenDayDate.innerHTML;
	const index = Array.from(taskList.children).indexOf(task);
	taskByDate[dayClicked][index].completed = task.classList.contains("mark-line");
};

const deleteTask = task => {
	const dayClicked = choosenDayDate.innerHTML;
	const index = Array.from(taskList.children).indexOf(task);
	taskByDate[dayClicked].splice(index, 1);
	taskList.removeChild(task);
};

function createButtonsForTasks(task) {
	const btnContainer = document.createElement("div");
	btnContainer.classList.add("btn-container");

	const markBtn = document.createElement("button");
	markBtn.classList.add("mark-btn");
	markBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	markBtn.addEventListener("click", () => markTask(task));

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete-btn");
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
	deleteBtn.addEventListener("click", e => {
		if (e.target) {
			deleteTask(task);
		}
	});

	btnContainer.append(markBtn, deleteBtn);
	task.append(btnContainer);
}

function arrowsAction() {
	previousBTN = document.querySelector(".previous-btn").addEventListener("click", () => {
		nav--;
		loadCalendar();
	});
	nextBTN = document.querySelector(".next-btn").addEventListener("click", () => {
		nav++;
		loadCalendar();
	});
}
arrowsAction();
