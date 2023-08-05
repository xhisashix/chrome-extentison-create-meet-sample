import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import GoogleCalenderEvent from "./googleCalenaderEvent";
const googleCalenderEvent = new GoogleCalenderEvent();
const btn = document.getElementById("btn");

if (btn) {
  btn.addEventListener("click", async () => {
    const title = document.getElementById("title") as HTMLInputElement;
    const start_date = document.getElementById(
      "start_date"
    ) as HTMLInputElement;
    const start_time = document.getElementById(
      "start_time"
    ) as HTMLInputElement;
    const end_date = document.getElementById("end_date") as HTMLInputElement;
    const end_time = document.getElementById("end_time") as HTMLInputElement;
    interface EventDetail {
      title: string;
      start: string;
      end: string;
    }
    const eventDetail: EventDetail = { title: "", start: "", end: "" };

    eventDetail.title = title.value;
    eventDetail.start = googleCalenderEvent.formatTime(
      start_date.value,
      start_time.value
    );
    eventDetail.end = googleCalenderEvent.formatTime(
      end_date.value,
      end_time.value
    );

    console.log(eventDetail);

    await googleCalenderEvent.createEvent(eventDetail);
  });
}
