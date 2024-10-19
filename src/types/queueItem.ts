export interface QueueItem {
  filesize: number,
  rating: number | null,
  numPlays: number | null,
  uploadedAt: string,
  lastViewedAt: string | null,
  duration: number | null,
  name: string,
  url: string,
  md5: string,
  contentType: string,
  secured: boolean,
  nsfw: boolean
};
