const downloadFile = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', url);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export async function downloadPng(imgUrl: string, exportName: string = 'default') {
  const b64toBlob = await fetch(`${imgUrl}`).then((res) => res.blob());
  downloadFile(b64toBlob, `${exportName}.png`);
}
