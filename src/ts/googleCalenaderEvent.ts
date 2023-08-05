import axios from "axios";
import moment from "moment";
import CONFIG from "./config";

class GoogleCalenderEvent {
  constructor() {}

  /**
   * @param {any} event
   * @memberof GoogleCalenderEvent
   * @description Googleカレンダーにイベントを作成する
   */
  public createEvent(eventDetail: any): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      interface EventData {
        summary: Object;
        start: {
          dateTime: Object;
          timeZone: string;
        };
        end: {
          dateTime: Object;
          timeZone: string;
        };
        conferenceData: {
          createRequest: {
            requestId: string;
            conferenceSolutionKey: {
              type: string;
            };
          };
        };
      }

      interface CalenderDetail {
        calendarId: string;
        meetUrl: string;
      }

      chrome.identity.getAuthToken(
        { interactive: true },
        function (token?: string) {
          if (!token) {
            console.log("token is undefined");
            return;
          }
          const event: EventData = {
            summary: eventDetail.title,
            start: {
              dateTime: eventDetail.start,
              timeZone: CONFIG.TIME_ZONE,
            },
            end: {
              dateTime: eventDetail.end,
              timeZone: CONFIG.TIME_ZONE,
            },
            conferenceData: {
              createRequest: {
                requestId: "sample123",
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          };

          axios
            .post(
              `https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${token}&conferenceDataVersion=1`,
              event
            )
            .then((response) => {
              const calenderDetail: CalenderDetail = {
                calendarId: "",
                meetUrl: "",
              };
              calenderDetail.calendarId = response.data.id;
              calenderDetail.meetUrl = response.data.hangoutLink;
              resolve(calenderDetail);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }
      );
    });
  }

  /**
   * @param {string} calendarId
   * @memberof GoogleCalenderEvent
   * @description Googleカレンダーのイベントを削除する
   * @returns {Promise<void>}
   */
  public deleteEvent(calendarId: string): Promise<void> {
    return new Promise((resolve: any, reject: any) => {
      chrome.identity.getAuthToken(
        { interactive: true },
        function (token?: string) {
          if (!token) {
            console.log("token is undefined");
            return;
          }
          axios
            .delete(
              `https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
              resolve();
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }
      );
    });
  }

  /**
   * @param {string} date
   * @param {string} time
   * @memberof GoogleCalenderEvent
   * @description 時間のフォーマット
   * @returns {string}
   */
  public formatTime(date: string, time: string): string {
    const format = `${date} ${time}`;
    const formatTime = moment(format).format();
    return formatTime;
  }
}

export default GoogleCalenderEvent;
