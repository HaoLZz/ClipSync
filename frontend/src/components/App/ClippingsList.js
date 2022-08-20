import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ClippingDetails from './ClippingDetails';
import { getClipboardText } from '../../utils/clipboard';
import { validURL } from '../../utils/utils';
import SocketContext from './SocketContext';
import UserContext from '../Users/UserContext';
import ActionButtonsBar from './ActionButtonsBar';

export default function ClippingsList({
  clippings,
  setClippings,
  latestText,
  setLatestText,
  setSocketError,
  showActionButton,
}) {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);
  // const [latestImage, setLatestImage] = useState(null);

  const handleClick = async () => {
    const text = await getClipboardText();
    // const imageBlob = await getClipboardContents();
    if (
      !text ||
      text.trim().length === 0 ||
      (latestText && text.trim() === latestText.trim())
    ) {
      // if copied text is the same as before
      return;
    }
    setLatestText(text);
    const contentType = validURL(text) ? 'Link' : 'Text';
    console.log(`new ${contentType} content`);

    const callback = (res) => {
      if (res.status === 'successful') {
        setClippings((clippings) => [res.data, ...clippings]);
      } else {
        console.error('clipping:create failed');
        setSocketError(res.data);
      }
    };

    const payload =
      contentType === 'Text'
        ? { origin: 'desktop', type: 'Text', content: text, isPinned: false }
        : contentType === 'Link'
        ? {
            origin: 'desktop',
            type: 'Link',
            url: text,
            isPinned: false,
            thumbnail: `https://www.google.com/s2/favicons?sz=64&domain_url=${text}`,
          }
        : {};

    socket.emit('clipping:create', payload, callback);

    // setLatestImage(imageBlob);
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        {showActionButton && <ActionButtonsBar handleClick={handleClick} />}
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {clippings.map((clipping) => (
            <ClippingDetails
              clipping={clipping}
              setClippings={setClippings}
              setSocketError={setSocketError}
              key={clipping._id}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
