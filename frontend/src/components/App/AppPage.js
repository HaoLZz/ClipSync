import React, { useState, useEffect, useCallback, useContext } from 'react';
import io from 'socket.io-client';
import Collapse from '@mui/material/Collapse';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import AlertDialog from './AlertDialog';
import Message from '../UI/Message';
import ClippingsList from './ClippingsList';
import usePermissions from './usePermissions';
import { useUser } from '../Users/UserContext';

const clippingsSample = [
  {
    origin: 'desktop',
    type: 'Text',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit,elit Lorem ipsum dolorelit Lorem ipsum dolor',
    isPinned: false,
  },
  {
    origin: 'phone',
    type: 'Text',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit',
    isPinned: true,
  },
  {
    origin: 'tablet',
    type: 'Link',
    content:
      'https://www.randstad.ca/jobs/javascript-developer-alberta-remote-permanent_calgary_39351251/',
    thumbnail: 'placeholder.png',
    isPinned: false,
  },
  {
    origin: 'desktop',
    type: 'Image',
    content: 'Family photo',
    format: 'png',
    resolution: '600x480',
    size: '200kb',
    thumbnail: 'placeholder.png',
    isPinned: true,
  },
  {
    origin: 'phone',
    type: 'File',
    content: 'How to become a better developer',
    format: 'pdf',
    size: '1500kb',
    isPinned: false,
  },
];
const socket = io('wss://localhost:5000');

export default function AppPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  const [clippings, setClippings] = useState(clippingsSample);

  const [user, setUser] = useUser();

  const { error: permissionError } = usePermissions();
  const [userAgree, setUserAgree] = useState('prompt');
  const [openAlert, setOpenAlert] = useState(true);
  const [openMessage, setOpenMessage] = useState(true);

  const [latestText, setLatestText] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('message', (msg) => {
      setLastMessage({ msg, timeStamp: new Date().toISOString() });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const tabLabels = ['Clipboard', 'Pinned'];

  const pinnedClippings = clippingsSample.filter(
    (clipping) => clipping.isPinned,
  );

  return (
    <>
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
          showActionButton={true}
        />
        <ClippingsList clippings={pinnedClippings} showActionButton={false} />
      </Tabs>
    </>
  );
}
