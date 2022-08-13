import React, { useState } from 'react';
import PrimaryAppBar from './PrimaryAppBar';
import Tabs from '../UI/Tabs';
import ClippingsList from './ClippingsList';

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
    origin: 'desktop',
    type: 'Link',
    content:
      'https://www.randstad.ca/jobs/javascript-developer-alberta-remote-permanent_calgary_39351251/',
    thumbnail: 'placeholder.png',
    isPinned: false,
  },
  {
    origin: 'desktop',
    type: 'Image',
    content: 'file content',
    format: 'png',
    resolution: '600x480',
    size: '200kb',
    thumbnail: 'placeholder.png',
    isPinned: true,
  },
  {
    origin: 'desktop',
    type: 'File',
    content: 'file content',
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

  return (
    <>
      <PrimaryAppBar />
      <Tabs tabLabels={tabLabels}>
        <ClippingsList clippings={clippings} />
        <ClippingsList clippings={pinnedClippings} />
      </Tabs>
    </>
  );
}
