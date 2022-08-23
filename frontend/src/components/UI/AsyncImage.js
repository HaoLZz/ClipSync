/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Skeleton from '@mui/material/Skeleton';

function AsyncImage({
  src,
  alt,
  imageSkeltonHeight = '200px',
  imageSkeltonWidth,
  ...props
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  useEffect(() => {
    setLoadedSrc(null);
    if (src) {
      const handleLoad = () => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.addEventListener('load', handleLoad);
      image.src = src;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [src]);
  if (loadedSrc === src) {
    return (
      <img
        css={css`
          border-radius: 10px;
          width: 100%;
        `}
        src={src}
        alt={alt}
        {...props}
      />
    );
  }
  return (
    <Skeleton
      variant="rounded"
      width={imageSkeltonWidth}
      height={imageSkeltonHeight}
      animation="wave"
      sx={{ maxWidth: { xs: '60px', sm: '100%' }, marginRight: '5%' }}
    />
  );
}

export default React.memo(AsyncImage);
