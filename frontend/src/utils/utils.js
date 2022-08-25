export function validURL(str) {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export function isImageFile(file) {
  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ];
  if (!file) {
    console.error('file is empty');
    return false;
  }
  return fileTypes.includes(file.type);
}

export function isValidFile(file) {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const fileTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.rar',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-7z-compressed',
    'text/plain',
  ];
  if (!file) {
    console.error('file is empty');
    return false;
  }
  return fileTypes.includes(file.type);
}

/* https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504 */

export function getExtension(path) {
  // extract file name from full path (supports `\\` and `/` separators)
  var basename = path.split(/[\\/]/).pop(),
    // get last position of `.`
    pos = basename.lastIndexOf('.');

  if (basename === '' || pos < 1)
    // if file name is empty or `.` not found (-1) or comes first (0)
    return '';
  // extract extension ignoring `.`
  return basename.slice(pos + 1);
}

export function formateFileSize(bytes, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + ' ' + units[u];
}

export function randomHeight(min = 1, max = 3, baseHeight = 100) {
  const height = (Math.floor(Math.random() * (max - min + 1)) + min) * 50;
  return `${height}px`;
}

export function getOrigin(useragent) {
  if (!useragent) {
    console.error('useragent is missing');
    return;
  }

  if (!useragent.isChrome) {
    console.error('Browser is not Chrome');
  }

  const origin = useragent.isDesktop
    ? 'desktop'
    : useragent.isTablet
    ? 'tablet'
    : useragent.isMobile
    ? 'mobile'
    : '';

  return {
    origin,
    platform: useragent.platform,
    os: useragent.os,
  };
}
