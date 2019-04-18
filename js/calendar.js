$(function () {

  function drawCalendar() {
    drawCalendarWeekdays();
    var dateArray = createDateArray();
    var n = 0;
    var blank = false;
    initCalendarContent.empty();
    while (!blank) {
      if (dayDisplay[n] == dateArray[0].weekday) {
        blank = true
      } else {
        initCalendarContent.append('<div class="blank"></div>');
        n++
      }
    }
    for (var i = 0; i < 42 - n; i++) {
      if (i >= dateArray.length) {
        initCalendarContent.append('<div class="blank"></div>')
      } else {
        var date = dateArray[i].day;
        var today = getLocalDate(new Date(year, month - 1, date)) ? '<div class="today">' : "<div>";
        initCalendarContent.append(today + "" + date + "</div>")
      }
    }
    var y = color[month - 1];
    initCalendarHeader.css("background-color", y).find("h1").text(monthDisplay[month - 1] + " " + year);
    initCalendarWeekdays.find("div").css("color", y);
    initCalendarContent.find(".today").css("background-color", y);

    draw()
  }

  function createDateArray() {
    var dateArray = [];
    for (var day = 1; day < v(year, month) + 1; day++) {
      dateArray.push({
        day: day,
        weekday: dayDisplay[m(year, month, day)]
      })
    }
    return dateArray
  }

  function drawCalendarWeekdays() {
    initCalendarWeekdays.empty();
    for (var e = 0; e < 7; e++) {
      initCalendarWeekdays.append("<div>" + dayDisplay[e].substring(0, 3) + "</div>")
    }
  }

  function draw() {
    var body;
    var getId = $("#calendar").css("width", size + "px");
    getId.find(body = "#calendar_weekdays, #calendar_content").css("width", size + "px").find("div").css({
      width: size / 7 + "px",
      height: size / 7 + "px",
      "line-height": size / 7 + "px"
    });
    getId.find("#calendar_header").css({
      height: size * (1 / 7) + "px"
    }).find('i[class^="icon-chevron"]').css("line-height", size * (1 / 7) + "px")
  }



  //get local date with (year, month) format
  function v(year, month) {
    return (new Date(year, month, 0)).getDate()
  }

  //get local date with (year, month - 1, day) format
  function m(year, month, day) {
    return (new Date(year, month - 1, day)).getDay()
  }

  //parse local date to date variable
  function getLocalDate(e) {
    return localDate(new Date) == localDate(e)
  }

  //get local date
  function localDate(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  }

  function getCalendar() {
    var date = new Date;
    year = date.getFullYear();
    month = date.getMonth() + 1
  }

  // variables
  var size = 500;
  var year = 2013;
  var month = 9;
  var array = [];
  var monthDisplay = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  var dayDisplay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var color = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
  var Calendar = $("#calendar");
  var initCalendarHeader = Calendar.find("#calendar_header");
  var initCalendarWeekdays = Calendar.find("#calendar_weekdays");
  var initCalendarContent = Calendar.find("#calendar_content");

  getCalendar();

  drawCalendar();

  initCalendarHeader.find('a[class^="icon-chevron"]').on("click", function () {
    var e = $(this);
    var r = function (e) {
      month = e == "next" ? month + 1 : month - 1;
      if (month < 1) {
        month = 12;
        year--
      } else if (month > 12) {
        month = 1;
        year++
      }
      drawCalendar()
    };
    if (e.attr("class").indexOf("left") != -1) {
      r("previous")
    } else {
      r("next")
    }
  })
})