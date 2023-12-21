// import URL from 'url-parse';

// export const extractIdFromYoutubeLink = (uri: string) => {
//   const url = new URL(uri, true);
//   return url.query.v;
// };

export const extractIdFromYoutubeLink = (uri: string) => {
  const match = uri.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
  return match ? match[1] : null;
};
