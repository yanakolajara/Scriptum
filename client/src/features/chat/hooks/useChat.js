import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { socketService as socket } from '@/shared/services/socket';
import { createEntry } from '@/shared/api/entries';
import { updateUserContext } from '@/shared/api/userContext';
import { captureUserSpeech } from '@/shared/services/ASR';

const buildMessageObject = (role, text) => {
  return {
    role,
    parts: [
      {
        text,
      },
    ],
  };
};

export function useChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const messagesRef = useRef(messages);
  const voiceInputActive = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const connectSocket = (initialMessages = []) => {
    socket.connect(url);
    socket.startChat(initialMessages);
  };

  const handleConnection = () => {
    setIsConnected(true);
    setWaitingResponse(false);
    socket.startChat(messagesRef.current);
    toast.success('Connected to server');
  };

  const handleResponse = async (response) => {
    const messageObject = buildMessageObject('model', response);
    setMessages((prev) => [...prev, messageObject]);
    // if voiceMode, speak response and await for promise to resolve
    setWaitingResponse(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    if (messagesRef.current.length > 0) {
      connectSocket(messagesRef.current);
    }
  };
  const sendMessage = (message) => {
    if (isConnected) {
      socket.send(message);
      setWaitingResponse(true);
      const messageObject = buildMessageObject('user', message);
      setMessages((prev) => [...prev, messageObject]);
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

  /**
   * capture users voice using the captureUserSpeech function and then sends the message once the user stops talking
   */
  const handleVoiceInput = async () => {
    if (voiceInputActive.current) return;
    voiceInputActive.current = true;
    setWaitingResponse(true);
    try {
      const message = await captureUserSpeech({});
      if (message) {
        sendMessage(message);
      } else {
        toast.error('No speech detected.');
        setWaitingResponse(false);
      }
    } catch (err) {
      toast.error('Voice input failed.');
      setWaitingResponse(false);
    }
    voiceInputActive.current = false;
  };

  useEffect(() => {
    if (chatMode === 'voice' && !waitingResponse) {
      handleVoiceInput();
    }
  }, [chatMode, waitingResponse]);

  useEffect(() => {
    connectSocket();

    const removeConnectListener = socket.addListener(
      'connected',
      handleConnection
    );
    const removeMessageListener = socket.addListener(
      'response',
      handleResponse
    );
    const removeDisconnectListener = socket.addListener(
      'disconnect',
      handleDisconnect
    );

    return () => {
      socket.disconnect();
      removeConnectListener();
      removeMessageListener();
      removeDisconnectListener();
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
