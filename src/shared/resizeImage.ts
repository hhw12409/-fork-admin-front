const dataURItoBlob = (dataURI: string) => {
  const bytes =
    dataURI.split(",")[0].indexOf("base64") >= 0 ? atob(dataURI.split(",")[1]) : unescape(dataURI.split(",")[1]);
  const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};
const resizeImage = (src: string, callback: (blob: Blob, dataUri: string) => void) => {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    const MAX_WIDTH = 600;
    const MAX_HEIGHT = 600;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const dataUri = canvas.toDataURL("image/jpeg");
    const blob = dataURItoBlob(dataUri);
    callback(blob, dataUri);
  };
  img.remove();
  canvas.remove();
};
export default resizeImage;
