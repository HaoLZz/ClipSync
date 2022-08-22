import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

function AsyncImage({
  src,
  alt,
  imageSkeltonHeight,
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
    return <img src={src} alt={alt} {...props} />;
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
