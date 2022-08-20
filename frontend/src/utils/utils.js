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
