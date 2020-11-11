//========================================================================================
//========================== VARIABLE AND FUNCTION DECLARATION ===========================
//========================================================================================

let todoList = [];

const getData = () => {
	const reference = localStorage.getItem("todos");
	if (reference) {
		todoList = JSON.parse(reference);
	}
};

const storeData = () => {
	localStorage.setItem("todos", JSON.stringify(todoList));
};

const renderData = () => {
	const doneList = document.querySelector("#done");
	const notDoneList = document.querySelector("#notDone");

	doneList.innerHTML = "";
	notDoneList.innerHTML = "";

	todoList.forEach(function (item) {
		const newLi = document.createElement("li");
		newLi.setAttribute("data-key", item.id);
		newLi.innerHTML =
			"<span><img src='./Assets/graphics/clear.svg' alt='delete'></span>" +
			item.text;
		if (item.done) {
			doneList.append(newLi);
		} else {
			notDoneList.append(newLi);
		}
	});
};

const deleteData = (id) => {
	todoList = todoList.filter(function (item) {
		return item.id != id;
	});
	storeData();
};

//========================================================================================
//============================ INITIALIZING AND DATA LOADING =============================
//========================================================================================

getData();
renderData();

//========================================================================================
//=============================== SETTING EVENT HANDLERS =================================
//========================================================================================

//Adding new tasks
$("input[type='text']").keypress(function (event) {
	if (event.which === 13) {
		var txt = $(this).val();
		if (txt != "") {
			$(this).val("");
			const newTodo = {
				id: Date.now(),
				text: txt,
				done: false,
			};
			todoList.push(newTodo);
			storeData();
			const newLi = document.createElement("li");
			newLi.setAttribute("data-key", newTodo.id);
			newLi.innerHTML =
				"<span><img src='./Assets/graphics/clear.svg' alt='delete'></span>" +
				newTodo.text;
			$("#notDone").append(newLi);
		}
	}
});

//Removing a task
$("ul").on("click", "span", function (event) {
	var selectedId;
	$(this)
		.parent()
		.fadeOut(200, function () {
			selectedId = $(this).attr("data-key");
			$(this).remove();
			deleteData(selectedId);
		});
	event.stopPropagation();
});

//Moving a task from notDone to Done list
$("#notDone").on("click", "li", function () {
	id = $(this).attr("data-key");
	txt = $(this).text();

	$(this).fadeOut(150, function () {
		todoList.forEach(function (item) {
			if (item.id == id) {
				item.done = true;
			}
		});

		$(this).remove();

		const newLi = document.createElement("li");
		newLi.setAttribute("data-key", id);
		newLi.innerHTML =
			"<span><img src='./Assets/graphics/clear.svg' alt='delete'></span>" + txt;
		$("#done").append(newLi);

		storeData();
	});
});

//Moving a task from Done to notDone list
$("#done").on("click", "li", function () {
	id = $(this).attr("data-key");
	txt = $(this).text();

	$(this).fadeOut(150, function () {
		todoList.forEach(function (item) {
			if (item.id == id) {
				item.done = false;
			}
		});

		$(this).remove();

		const newLi = document.createElement("li");
		newLi.setAttribute("data-key", id);
		newLi.innerHTML =
			"<span><img src='./Assets/graphics/clear.svg' alt='delete'></span>" + txt;
		$("#notDone").append(newLi);

		storeData();
	});
});

//mouse hover animations
$("ul").on("mouseenter", "li", function () {
	$(this).find("span").css("opacity", ".8");
});

$("ul").on("mouseleave", "li", function () {
	$(this).find("span").css("opacity", ".3");
});

$("ul").on("mouseenter", "li", function () {
	$(this).toggleClass("textHighlight");
});

$("ul").on("mouseleave", "li", function () {
	$(this).toggleClass("textHighlight");
});

//========================================================================================
//=============================== DATE, TIME AND WEEKDAY =================================
//========================================================================================

//Displaying Date, WeekDay and TIme
var date = new Date();
var dayNames = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];
var hrs, mins, ampm, days, month, year, day;

setInterval(function () {
	hrs = date.getHours();
	mins = date.getMinutes();
	ampm = hrs >= 12 ? "PM" : "AM";
	hrs =
		hrs > 12
			? String(hrs - 12).padStart(2, "0")
			: hrs < 1
			? "12"
			: String(hrs).padStart(2, "0");
	$("#timeField").text(`${hrs}:${mins} ${ampm}`);

	days = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	$("#dateField").text(`${days}-${month}-${year}`);

	day = date.getDay();
	$("#dayField").text(dayNames[day]);
}, 1000);
