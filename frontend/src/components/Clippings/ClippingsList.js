import React, { useContext, useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ClippingDetails from './ClippingDetails';
import { getClipboardText } from '../../utils/clipboard';
import {
  validURL,
  isImageFile,
  isValidFile,
  formateFileSize,
  getExtension,
  randomHeight,
} from '../../utils/utils';
import SocketContext from '../App/SocketContext';
import ActionButtonsBar from '../App/ActionButtonsBar';

export default function ClippingsList({
  clippings,
  dispatch,
  latestText,
  setLatestText,
  setSocketError,
  showActionButton,
  isLoading,
}) {
  const socket = useContext(SocketContext);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  // const [latestImage, setLatestImage] = useState(null);

  const handleSync = useCallback(async () => {
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
        dispatch({ type: 'CREATE_CLIPPING', payload: res.data });
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
  }, [dispatch, latestText, setLatestText, setSocketError, socket]);

  const handleImageUpload = useCallback(
    (e) => {
      const imageFile = e.target?.files[0];
      console.log(imageFile);

      if (!isImageFile(imageFile)) {
        console.error('selected file is not an image');
        return;
      }

      setIsImageUploading(true);
      const meta = {
        originalFilename: imageFile.name,
        format: imageFile.type.toLowerCase().split('/')[1],
        size: formateFileSize(imageFile.size),
      };

      const clippingInfo = {
        origin: 'desktop',
        isPinned: false,
        type: 'Image',
      };

      const callback = (res) => {
        if (res.status === 'successful') {
          console.log('image upload successful');
          setIsImageUploading(false);
          dispatch({ type: 'UPDATE_CLIPPING', payload: res.data });
        } else {
          console.error(res.status, res.data);
          setSocketError(res.data);
        }
      };

      socket.emit(
        'clipping:create_image',
        clippingInfo,
        meta,
        imageFile,
        callback,
      );
      // reset input files
      // inputEl.current.reset();
      e.target.value = null;
      console.log(e.target.value);
    },
    [dispatch, setSocketError, socket],
  );

  const handleFileUpload = useCallback(
    (e) => {
      const file = e.target?.files[0];
      console.log(file);

      if (!isValidFile(file)) {
        console.error('selected file is not valid');
        return;
      }

      setIsFileUploading(true);
      const meta = {
        originalFilename: file.name,
        format: getExtension(file.name),
        size: formateFileSize(file.size),
      };

      const clippingInfo = {
        origin: 'desktop',
        isPinned: false,
        type: 'File',
      };

      const callback = (res) => {
        if (res.status === 'successful') {
          console.log('file upload successful');
          setIsImageUploading(false);
          dispatch({ type: 'UPDATE_CLIPPING', payload: res.data });
        } else {
          console.error(res.status, res.data);
          setSocketError(res.data);
        }
      };

      socket.emit('clipping:create_file', clippingInfo, meta, file, callback);
      // reset input files

      e.target.value = null;
      console.log(e.target.value);
    },
    [dispatch, setSocketError, socket],
  );

  const placeholderClippings = Array.from({ length: 5 }, (v, i) => i).map(
    (i) => {
      return (
        <Skeleton
          variant="rounded"
          width="100%"
          height={randomHeight()}
          key={i}
        />
      );
    },
  );

  return (
    <>
      <Container component="main" maxWidth="md">
        {showActionButton && (
          <ActionButtonsBar
            handleSync={handleSync}
            handleImageUpload={handleImageUpload}
            handleFileUpload={handleFileUpload}
            isImageUploading={isImageUploading}
          />
        )}
        {isLoading ? (
          <Stack spacing={2}>{placeholderClippings}</Stack>
        ) : (
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
                dispatch={dispatch}
                setSocketError={setSocketError}
                key={clipping._id}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
