function getEvents(nextDays) {
  const calURL = "https://www.googleapis.com/calendar/v3/calendars/89d61hh5bupr6o5kcdu677ja24fonsf6@import.calendar.google.com/events";
  $.get(calURL, function(data) {
    console.log(data);
  });
}
