const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    var event = {
      summary: "Sample Event",
      start: {
        dateTime: "2023-08-15T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2023-08-15T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=" +
        token
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status == 200) {
        // Success
        console.log(xhr.responseText);
      } else {
        // Failure
        console.log("Error " + xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(event));
  });
});
