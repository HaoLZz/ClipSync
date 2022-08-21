import React, { useState, useEffect, useReducer } from 'react';
import io from 'socket.io-client';
import Collapse from '@mui/material/Collapse';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import AlertDialog from './AlertDialog';
import Message from '../UI/Message';
import ClippingsList from './ClippingsList';
import usePermissions from './usePermissions';
import { useUser } from '../Users/UserContext';
import clippingsReducer from './clippingsReducer';
import SocketContext from './SocketContext';

const URL = process.env.REACT_APP_SOCKET_URL;
const socket = io(URL, { autoConnect: false });

export default function AppPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketError, setSocketError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [clippings, dispatch] = useReducer(clippingsReducer, []);

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
          dispatch({ type: 'LIST_CLIPPING', payload: res.data.reverse() });
          setIsLoading(false);
        } else {
          console.error(res.data);
          setSocketError('clipping:list failed');
        }
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('clipping:created', (newClipping) =>
      dispatch({ type: 'CREATE_CLIPPING', payload: newClipping }),
    );

    socket.on('clipping:updated', (updateClipping) =>
      dispatch({ type: 'UPDATE_CLIPPING', payload: updateClipping }),
    );

    socket.on('clipping:deleted', (deletedClippingId) =>
      dispatch({ type: 'DELETE_CLIPPING', payload: deletedClippingId }),
    );
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
            dispatch={dispatch}
            latestText={latestText}
            setLatestText={setLatestText}
            setSocketError={setSocketError}
            showActionButton={true}
            isLoading={isLoading}
          />
          <ClippingsList
            clippings={pinnedClippings}
            dispatch={dispatch}
            showActionButton={false}
            setSocketErro={setSocketError}
            isLoading={isLoading}
          />
        </Tabs>
      </SocketContext.Provider>
    </>
  );
}
