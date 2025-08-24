import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';
import { createEntry } from '@/api/entries';
import { updateUserContext } from '@/api/userContext';
import { useNavigate } from 'react-router-dom';

export function useChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const sendMessage = (message) => {
    if (isConnected) {
      socketService.send(message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          text: message,
        },
      ]);
    }
  };

  const generateEntry = async () => {
    try {
      let entry = await createEntry(messages);
      await updateUserContext(entry.data);
      navigate(`/edit-entry?id=${entry.data.id}`);
    } catch (error) {
      toast.error(error);
    } finally {
    }
  };

  useEffect(() => {
    socketService.connect(url);

    const removeConnectListener = socketService.addListener(
      'connect',
      (message) => {
        setIsConnected(true);
      }
    );

    const removeMessageListener = socketService.addListener(
      'response',
      (response) => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            text: response,
          },
        ]);
      }
    );

    const removeDisconnectListener = socketService.addListener(
      'disconnect',
      (message) => {
        setIsConnected(false);
      }
    );

    return () => {
      removeConnectListener();
      removeMessageListener();
      removeDisconnectListener();
      // socketService.disconnect();
    };
  }, [url]);

  useEffect(() => {}, [chatMode]);

  useEffect(() => {
    if (messages.length > 0) {
      if (messages.at(-1).role == 'ai') {
        setWaitingResponse(false);
      } else {
        setWaitingResponse(true);
      }
    }
  }, [messages]);

  return {
    isConnected,
    messages,
    sendMessage,
    generateEntry,
    chatMode,
    setChatMode,
    waitingResponse,
    setWaitingResponse,
  };
}
