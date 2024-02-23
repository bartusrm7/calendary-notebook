let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const dayList = document.querySelector(".main__day-list");
const nameOfMonthAndYear = document.querySelector(".main__name-of-month-and-year");
const weekDaysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const popUp = document.querySelector(".popup");
const backBtn = document.querySelector(".popup__back-btn");
const popUpDateName = document.querySelector(".popup__date-name");
const popUpInput = document.querySelector(".popup__input");
const popUpAddBtn = document.querySelector(".popup__add-input-btn");
const popUpError = document.querySelector(".popup__error");
const ulList = document.querySelector(".popup__ul-list");
const bgShadow = document.querySelector(".bg-shadow");

function openPopUp() {
	// clicked = date;

	// const eventForDay = events.find(e => e.date === clicked);

	// if (eventForDay) {
	// } else {
	popUp.classList.remove("display-class");
	bgShadow.classList.remove("display-class");
}

backBtn.addEventListener("click", () => {
	popUp.classList.add("display-class");
	bgShadow.classList.add("display-class");
});

function addTasksToPopUp() {
	popUpAddBtn.addEventListener('click', () => {
		
	})
}

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

	const dateString = firstDayOfMonth.toLocaleDateString("en-gb", {
		weekday: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	const nameOfMonthAndYear = (document.querySelector(
		".main__name-of-month-and-year"
	).innerHTML = `${date.toLocaleDateString("en-gb", {
		month: "long",
		year: "numeric",
	})}`);

	const paddingDays = weekDaysArray.indexOf(dateString.split(", ")[0]);

	dayList.innerHTML = "";

	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const dayLi = document.createElement("li");
		dayLi.classList.add("day");

		if (i > paddingDays) {
			dayLi.innerHTML = i - paddingDays;

			dayLi.addEventListener("click", () => {
				openPopUp();
			});
		} else {
			dayLi.classList.add("empty-field");
		}
		dayList.appendChild(dayLi);
	}
}
loadCalendar();

const leftArrow = document.querySelector(".fa-arrow-left").addEventListener("click", () => {
	nav--;
	loadCalendar();
});
const rightArrow = document.querySelector(".fa-arrow-right").addEventListener("click", () => {
	nav++;
	loadCalendar();
});
