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

export const updateQueryCacheLikes = (
  postLikes,
  postId,
  userId,
  actionType
) => {
  if (actionType === 'like') {
    return [...postLikes, { authorId: userId, postId }];
  } else {
    return postLikes.filter((like) => like.authorId !== userId);
  }
};

export const checkTrends = (postText = '') => {
  const firstSplit = postText
    .trim()
    .split(/\s+/)
    .filter((word) => word.startsWith('#'))
    .map((word) => word.toLowerCase());

  let response = firstSplit;

  firstSplit.map((word) => {
    const secondSplit = word.split('#');
    if (secondSplit.length > 1) {
      response = [
        ...response,
        ...secondSplit.slice(1, secondSplit.length),
      ].filter((el) => el !== word);
    }
  });

  response = [...new Set(response)];
  return response;
};
