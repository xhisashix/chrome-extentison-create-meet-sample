import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import GoogleCalenderEvent from "./googleCalenaderEvent";
const btn = document.getElementById("btn");

const eventDetail = {
  title: "test",
  start: "2023-08-15T09:00:00-07:00",
  end: "2023-08-15T17:00:00-07:00",
};

if (btn) {
  btn.addEventListener("click", async () => {
    const googleCalenderEvent = new GoogleCalenderEvent();
    const calendarDetail: any = await googleCalenderEvent.createEvent(
      eventDetail
    );

    await googleCalenderEvent.deleteEvent(calendarDetail.calendarId);

    console.log(calendarDetail.meetUrl);
  });
}
