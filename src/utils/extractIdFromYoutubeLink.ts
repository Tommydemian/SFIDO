export const extractIdFromYoutubeLink = (uri: string) => {
  const match = uri.match(/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};
