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
  if (!file) {
    console.error('file is empty');
    return false;
  }
  return file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp|BMP)$/);
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
