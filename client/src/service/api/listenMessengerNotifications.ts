
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AuthToken } from "../authToken";
import type { Message } from "../../types/types";

export async function listenMessengerNotifications(
//   onMessage: (message: Message) => void
) {
  const token = AuthToken.get();
  await fetchEventSource(
    `http://localhost:8080/message/notifications`,
    {
      onmessage(data) {
        // if (data && data.data) {
        //   const message = JSON.parse(data.data);
        //   onMessage(message);
        // }
        console.log(data)
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}