export async function getClipboardText() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
    return text;
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}

export async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();
    console.log(clipboardItems);
    if (clipboardItems.length < 1) return;
    const blobOutput = await clipboardItems[0].getType('image/png');
    const imageUrl = window.URL.createObjectURL(blobOutput);
    document.getElementById('image-field').src = imageUrl;
    console.log('Image pasted.', imageUrl);
    return blobOutput;
  } catch (e) {
    console.log('No png image', e);
  }
}
