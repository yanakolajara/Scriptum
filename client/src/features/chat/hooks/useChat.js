import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { socketService } from '@/shared/services/socket';
import { createEntry } from '@/shared/api/entries';
import { updateUserContext } from '@/shared/api/userContext';
import toast from 'react-hot-toast';

export function useChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Keep messages ref up to date for reconnect
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Encapsulate socket connection logic
  const connectSocket = (initialMessages = []) => {
    socketService.connect(url);
    socketService.startChat(initialMessages);
  };

  const sendMessage = (message) => {
    if (isConnected) {
      socketService.send(message);
      setWaitingResponse(true);
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ]);
    } else {
      toast.error('Not connected to server');
    }
  };

  const generateEntry = async () => {
    try {
      let entry = await createEntry(messages);
      await updateUserContext(entry.data);
      navigate(`/edit-entry?id=${entry.data.id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    connectSocket();

    // When connected, start chat with socketService.startChat
    const removeConnectListener = socketService.addListener('connected', () => {
      setIsConnected(true);
      setWaitingResponse(false);
      socketService.startChat(messagesRef.current);
      toast.success('Connected to server');
    });

    const removeMessageListener = socketService.addListener(
      'response',
      (response) => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            parts: [
              {
                text: response,
              },
            ],
          },
        ]);
        setWaitingResponse(false);
      }
    );

    const removeDisconnectListener = socketService.addListener(
      'disconnect',
      () => {
        setIsConnected(false);
        // Manual reconnect with messages
        if (messagesRef.current.length > 0) {
          connectSocket(messagesRef.current);
        }
      }
    );

    return () => {
      removeConnectListener();
      removeMessageListener();
      removeDisconnectListener();
      // socketService.disconnect();
    };
  }, [url]);

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
