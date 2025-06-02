function fetchEvents() {
  $.get('/events', function(data) {
    $('#event-list').empty();
    data.forEach(event => {
      $('#event-list').append(`<li>${event.message}</li>`);
    });
  });
}

fetchEvents();
setInterval(fetchEvents, 15000);
