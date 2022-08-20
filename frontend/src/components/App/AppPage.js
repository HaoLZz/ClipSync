import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Collapse from '@mui/material/Collapse';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import AlertDialog from './AlertDialog';
import Message from '../UI/Message';
import ClippingsList from './ClippingsList';
import usePermissions from './usePermissions';
import { useUser } from '../Users/UserContext';
import SocketContext from './SocketContext';

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, { autoConnect: false });

export default function AppPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketError, setSocketError] = useState(null);

  const [clippings, setClippings] = useState([]);

  const [user, setUser] = useUser();

  const { error: permissionError } = usePermissions();
  const [openAlert, setOpenAlert] = useState(true);
  const [openMessage, setOpenMessage] = useState(true);

  const [latestText, setLatestText] = useState('');

  useEffect(() => {
    // when in development, add a catch-all listener
    if (process.env.REACT_APP_ENV_MODE === 'development') {
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });
    }

    socket.auth = { token: user.token };
    socket.connect();

    socket.on('connect_error', (err) => {
      setSocketError(err.message);
      setIsConnected(false);
    });

    socket.on('connect', () => {
      console.log('connected to server', socket.id);
      setIsConnected(true);
      socket.emit('clipping:list', user._id, (res) => {
        if (res.status === 'successful') {
          setClippings(res.data.reverse());
        } else {
          console.error(res.data);
          setSocketError('clipping:list failed');
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('clipping:created', (newClipping) => {
      setClippings((clippings) => [newClipping, ...clippings]);
    });

    socket.on('clipping:updated', (updateClipping) => {
      setClippings((clippings) =>
        clippings.map((clipping) =>
          clipping._id === updateClipping._id ? updateClipping : clipping,
        ),
      );
    });

    socket.on('clipping:deleted', (deletedClippingId) => {
      setClippings((clippings) => {
        const clippingIndex = clippings.findIndex(
          (clipping) => clipping._id === deletedClippingId,
        );

        return [
          ...clippings.slice(0, clippingIndex),
          ...clippings.slice(clippingIndex + 1),
        ];
      });
    });
    return () => {
      socket.removeAllListeners();
      socket.offAny();
      socket.disconnect();
    };
  }, [user._id, isConnected, user.token]);

  const tabLabels = ['Clipboard', 'Pinned'];

  const pinnedClippings = clippings.filter((clipping) => clipping.isPinned);

  return (
    <>
      <SocketContext.Provider value={socket}>
        {!user.grantPermissions && (
          <AlertDialog open={openAlert} setOpen={setOpenAlert} />
        )}
        <PrimaryAppBar />
        {permissionError && (
          <Collapse in={openMessage}>
            <Message
              severity="error"
              title="Error"
              handleClose={() => setOpenMessage(false)}
            >{`${permissionError.name}: ${permissionError.message}`}</Message>
          </Collapse>
        )}
        <Tabs tabLabels={tabLabels}>
          <ClippingsList
            clippings={clippings}
            setClippings={setClippings}
            latestText={latestText}
            setLatestText={setLatestText}
            setSocketError={setSocketError}
            showActionButton={true}
          />
          <ClippingsList
            clippings={pinnedClippings}
            setClippings={setClippings}
            showActionButton={false}
            setSocketErro={setSocketError}
          />
        </Tabs>
      </SocketContext.Provider>
    </>
  );
}
