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

const socket = io('wss://localhost:5000');

export default function AppPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketError, setSocketError] = useState(null);

  const [clippings, setClippings] = useState([]);

  const [user, setUser] = useUser();

  const { error: permissionError } = usePermissions();
  const [userAgree, setUserAgree] = useState('prompt');
  const [openAlert, setOpenAlert] = useState(true);
  const [openMessage, setOpenMessage] = useState(true);

  const [latestText, setLatestText] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      setIsConnected(true);
    });

    if (isConnected) {
      socket.emit('User_Connect', user._id);
      socket.emit('clipping:list', user._id, (res) => {
        if (res.status === 'successful') {
          setClippings(res.data.reverse());
        } else {
          console.error(res.data);
          setSocketError('clipping:list failed');
        }
      });
    }

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
      socket.off('connect');
      socket.off('disconnect');
      socket.off('clipping:created');
      socket.off('clipping:updated');
      socket.off('clipping:deleted');
    };
  }, [user._id, isConnected]);

  const tabLabels = ['Clipboard', 'Pinned'];

  const pinnedClippings = clippings.filter((clipping) => clipping.isPinned);

  return (
    <>
      <SocketContext.Provider value={socket}>
        {userAgree === 'prompt' && (
          <AlertDialog
            open={openAlert}
            setOpen={setOpenAlert}
            setAgree={setUserAgree}
          />
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
            setSocketErro={setSocketError}
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
