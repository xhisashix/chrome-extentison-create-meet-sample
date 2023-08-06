import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import GoogleCalenderEvent from "./googleCalenaderEvent";
const googleCalenderEvent = new GoogleCalenderEvent();
const btn = document.getElementById("btn");

interface EventDetail {
  title: string;
  start: string;
  end: string;
}

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

const createUrl = document.getElementById("createUrl");
if (createUrl) {
  createUrl.addEventListener("click", async () => {
    const eventDetail: EventDetail = {
      title: "sample",
      start: "2023-07-23T10:00:00+09:00",
      end: "2023-07-23T10:00:00+09:00",
    };

    console.log(eventDetail);

    const meetUrl: any = await googleCalenderEvent.createEvent(eventDetail);
    const completeAlert = document.getElementById("completeAlert");
    if (completeAlert) {
      completeAlert.classList.remove("d-none");
    }
    const meetUrlInput = document.getElementById("meetUrl") as HTMLInputElement;
    meetUrlInput.innerText = meetUrl.meetUrl;
    await googleCalenderEvent.deleteEvent(meetUrl.calendarId);
  });
}

const triggerEl = document.querySelector("#navId a");
if (triggerEl instanceof HTMLInputElement) {
  let tab = new bootstrap.Tab(triggerEl); // eslint-disable-line no-unused-vars
  tab.show();
}

const copyButton = document.getElementById("copyBtn");
if (!copyButton) {
  throw new Error("copyButton is null");
}
copyButton.addEventListener("click", async () => {
  let copyText = document.getElementById("meetUrl") as HTMLInputElement;
  console.log(copyText.textContent);
  // copy Html inner text
  await navigator.clipboard.writeText(copyText.textContent || "");
  alert(`${copyText.textContent}コピーしました。`);
});