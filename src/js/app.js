import { fromFetch } from "rxjs/fetch";
import { switchMap, of, catchError } from "rxjs";
import MessageManager from "./messageManager";

const app = document.querySelector(".app");
const messageManager = new MessageManager(app);

setInterval(() => {
  const data$ = fromFetch("https://email-81w9.onrender.com/messages/unread").pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({
          status: "ok",
          timestamp: new Date().getTime(),
          messages: [],
        });
      }
    }),
    catchError(() => {
      return of({
        status: "ok",
        timestamp: new Date().getTime(),
        messages: [],
      });
    }),
  );

  data$.subscribe({
    next: (result) => {
      console.log(result);
      if (result.status === "ok" && result.messages.length > 0) {
        messageManager.renderMessages(result);
      }
    },
  });
}, 2000);
