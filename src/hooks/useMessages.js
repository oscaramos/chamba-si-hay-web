import { useState } from "react";

function useMessages() {
  const [messages, setMessages] = useState([
    {
      content: "Mensaje 1",
      isFromOwner: false,
    },
    {
      content: "Mensaje 2",
      isFromOwner: false,
    },
    {
      content: "The star malfunctions history like an ancient space suit.",
      isFromOwner: true,
    },
  ]);

  const send = (message) => {
    setMessages([
      ...messages,
      {
        content: message,
        isFromOwner: true,
      },
    ]);
  };

  return { messages, send };
}

export default useMessages;
