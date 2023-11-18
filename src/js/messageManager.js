export default class MessageManager {
  constructor(app) {
    this.messagesContainer = app.querySelector(".messages");
  }

  renderMessages(messagesData) {
    if (messagesData.messages.length > 0) {
      messagesData.messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        const messageFromDiv = document.createElement("div");
        messageFromDiv.classList.add("message__from");
        messageFromDiv.textContent = message.from;
        const messageSubjectDiv = document.createElement("div");
        messageSubjectDiv.classList.add("message__subject");
        message.subject.length > 15
          ? (messageSubjectDiv.textContent =
              message.subject.slice(0, 15) + "...")
          : (messageSubjectDiv.textContent = message.subject);
        const messageReceivedDiv = document.createElement("div");
        messageReceivedDiv.classList.add("message__received");
        messageReceivedDiv.textContent = this._getCurrentTime(message.received);
        messageDiv.appendChild(messageFromDiv);
        messageDiv.appendChild(messageSubjectDiv);
        messageDiv.appendChild(messageReceivedDiv);
        this.messagesContainer.prepend(messageDiv);
      });
    }
  }

  _getCurrentTime(timestamp) {
    const datetime = new Date(timestamp);
    return `${("0" + datetime.getHours()).slice(-2)}:${(
      "0" + datetime.getMinutes()
    ).slice(-2)}
      ${("0" + datetime.getDate()).slice(-2)}.${(
        "0" +
        (datetime.getMonth() + 1)
      ).slice(-2)}.${"" + datetime.getFullYear()}`;
  }
}
