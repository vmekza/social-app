export const getFileType = (url) => {
  if (url === null || url === undefined) return 'unknown';

  const extension = url.split('.').pop();
  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'image';
    case 'avi':
    case 'mp4':
    case 'mov':
      return 'video';
    default:
      return 'unknown';
  }
};
