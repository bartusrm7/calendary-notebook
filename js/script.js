let nav = 0;

const listOfDays = document.querySelector(".main__list-of-days");
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday ", "Sunday "];

const popUp = document.querySelector(".popup");
const popUpInput = document.querySelector(".popup__input");
const popUpInputAddBtn = document.querySelector(".popup__input-add-btn");
const popUpInputError = document.querySelector(".popup__input-error");
const backgroundShadow = document.querySelector(".bg-shadow");

function loadCalendar() {
	const date = new Date();

	if (nav !== 0) {
		date.setMonth(new Date().getMonth() + nav);
	}

	const day = date.getDay();
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

	for (let i = 0; i <= paddingDays + daysInMonth; i++) {
		const dayLi = document.createElement("li");
		dayLi.classList.add("main__day-of-month");

		if (i > paddingDays) {
			dayLi.innerHTML = i - paddingDays;
		} else {
			dayLi.classList.add("main__empty-field-of-day");
		}
		listOfDays.appendChild(dayLi);
	}
}
loadCalendar();

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
