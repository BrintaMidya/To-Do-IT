//Adding new tasks
$("input[type='text']").keypress(function (event) {
	if (event.which === 13) {
		var txt = $(this).val();
		$(this).val("");
		$("#notDone").append(
			"<li><span><img src='./Assets/graphics/clear.svg' alt='delete'></span>" +
				txt +
				"</li>"
		);
	}
});

//Removing a task
$("ul").on("click", "span", function (event) {
	$(this)
		.parent()
		.fadeOut(200, function () {
			$(this).remove();
		});
	event.stopPropagation();
});

//Moving a task from notDone to Done list
$("#notDone").on("click", "li", function () {
	temp = $(this).html();
	$(this).fadeOut(150, function () {
		$("#done").append("<li>" + temp + "</li>");
	});
});

//Moving a task from Done to notDone list
$("#done").on("click", "li", function () {
	temp = $(this).html();
	$(this).fadeOut(150, function () {
		$("#notDone").append("<li>" + temp + "</li>");
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
var hrs, mins, days, month, year, day;

setInterval(function () {
	hrs = date.getHours();
	mins = date.getMinutes();
	$("#timeField").text(`${hrs}:${mins}`);

	days = date.getDate();
	month = date.getMonth();
	year = date.getFullYear();
	$("#dateField").text(`${days}-${month}-${year}`);

	day = date.getDay();
	$("#dayField").text(dayNames[day]);
}, 1000);
