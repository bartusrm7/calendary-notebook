//używać klas
const dayList = document.querySelector(".main__day-list");
const nameOfMonthAndYear = document.querySelector(".main__name-of-month-and-year");
const leftArrow = document.querySelector(".fa-arrow-left");
const rightArrow = document.querySelector(".fa-arrow-right");
const weekDaysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const popUp = document.querySelector(".popup");
const backBtn = document.querySelector(".popup__back-btn");
const popUpDateName = document.querySelector(".popup__date-name");
const popUpInput = document.querySelector(".popup__input");
const popUpAddBtn = document.querySelector(".popup__add-input-btn");
const popUpError = document.querySelector(".popup__error");
const ulList = document.querySelector(".popup__ul-list");
const bgShadow = document.querySelector(".bg-shadow");

function load() {
	const dt = new Date();

	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav);
	}

	const year = dt.getFullYear();
	const month = dt.getMonth();
	const firstDayOfMonth = new Date(year, month + 1);
	const dayInMonth = new Date(year, month + 1, 0).getDate();

	const dateForString = firstDayOfMonth.toLocaleDateString("en-gb", {
		weekday: "long",
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	const paddingDays = weekDaysArray.indexOf(dateForString.split(", ")[0]);

	nameOfMonthAndYear.innerHTML = `${dt.toLocaleDateString("en-gb", {
		month: "long",
		year: "numeric",
	})}`;

	dayList.innerHTML = "";

	for (let i = 1; i <= paddingDays + dayInMonth; i++) {
		const dayLi = document.createElement("li");
		dayLi.classList.add("day");

		if (i > paddingDays) {
			dayLi.innerHTML = i - paddingDays;

			dayLi.addEventListener("click", () => {
				openPopUp(`${i - paddingDays}/${month + 1}/${year}`);
			});
		} else {
			dayLi.classList.add("empty-field");
			dayLi.classList.remove("day");
		}
		dayList.appendChild(dayLi);
	}
}
load();

function arrowsAction() {
	leftArrow.addEventListener("click", () => {
		nav--;
		load();
	});
	rightArrow.addEventListener("click", () => {
		nav++;
		load();
	});
}
arrowsAction();

function openPopUp(date) {
	clicked = date;

	const eventForDay = events.find(e => e.date === clicked);

	if (eventForDay) {
		console.log("click");
	} else {
		popUp.classList.remove("display-class");
		bgShadow.classList.remove("display-class");
	}
}



function createButtonsForLiToPopUp(liItem) {
	const popUpMarkBtn = document.createElement("button");
	popUpMarkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	popUpMarkBtn.classList.add("mark-btn");

	const popUpEditBtn = document.createElement("button");
	popUpEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
	popUpEditBtn.classList.add("edit-btn");

	const popUpDeleteBtn = document.createElement("button");
	popUpDeleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
	popUpDeleteBtn.classList.add("delete-btn");

	const btnContainer = document.createElement("div");
	btnContainer.classList.add("popup__btn-container");
	btnContainer.append(popUpMarkBtn, popUpEditBtn, popUpDeleteBtn);

	liItem.append(btnContainer);
}

function closePopUp() {
	backBtn.addEventListener("click", () => {
		popUp.classList.add("display-class");
		bgShadow.classList.add("display-class");
		clicked = null;
	});
}
closePopUp();
