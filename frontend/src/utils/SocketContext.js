import { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket(userId) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!userId) {
      socket.on('connect', () => {
        setStatus('connected');
      });
      socket.emit('User_Connect', userId);
      socket.emit('chat message', 'first message');
      socket.on('chat message', (msg) => {
        console.log(msg);
        setData(msg);
      });
      socket.on('connect_error', (error) => {
        console.error(error);
        setError(error);
      });
    }
    return () => {
      socket.disconnect();
      setStatus('disconnected');
    };
  }, [socket, userId]);

  return { data, error, status };
}

export default SocketContext;
