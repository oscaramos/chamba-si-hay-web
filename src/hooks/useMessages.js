import { useEffect, useState } from "react";
import { getMessages, storeMessage } from "../services/MessageService";

function useMessages(jobId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const requestMessages = async () => {
      const response = await getMessages(jobId);
      if (response.status === 200) {
        setMessages(response.data);
      }
    };

    requestMessages();
  }, [jobId]);

  const send = async (message) => {
    const response = await storeMessage(jobId, message);
    if (response.status !== 200) {
      throw new Error("Error al enviar mensaje");
    }
  };

  return [messages, { send }];
}

export default useMessages;
