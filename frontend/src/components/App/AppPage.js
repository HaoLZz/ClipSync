import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import AlertDialog from './AlertDialog';
import Message from '../UI/Message';
import ClippingsList from './ClippingsList';
import usePermissions from './usePermissions';

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

export default function AppPage() {
  const [clippings, setClippings] = useState(clippingsSample);
  const tabLabels = ['Clipboard', 'Pinned'];

  const pinnedClippings = clippingsSample.filter(
    (clipping) => clipping.isPinned,
  );

  const { permissions, error } = usePermissions();
  const [userAgree, setUserAgree] = useState('prompt');
  const [openAlert, setOpenAlert] = useState(true);
  const [openMessage, setOpenMessage] = useState(true);

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
      {error && (
        <Collapse in={openMessage}>
          <Message
            severity="error"
            title="Error"
            handleClose={() => setOpenMessage(false)}
          >{`${error.name}: ${error.message}`}</Message>
        </Collapse>
      )}
      <Tabs tabLabels={tabLabels}>
        <ClippingsList clippings={clippings} />
        <ClippingsList clippings={pinnedClippings} />
      </Tabs>
    </>
  );
}
