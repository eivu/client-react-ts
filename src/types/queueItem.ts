export interface QueueItem {
  fileSize: number,
  rating: number,
  numPlays: number,
  uploadedAt: string,
  lastViewedAt: string,
  duration: number,
  name: string,
  url: string,
  md5: string,
  contentType: string,
  delicate: boolean,
  nsfw: boolean
};
