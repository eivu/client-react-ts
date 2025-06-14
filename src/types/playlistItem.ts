export interface PlaylistItem {
  id: number;
  asset: string;
  md5: string;
  filesize: number;
  rating: number | null;
  nsfw: boolean;
  uploadedAt: string;
  createdAt: string;
  name: string;
  duration: number | null;
  numPlays: number | null;
  lastViewedAt: string | null;
  dateAquiredAt: string | null;
  shared: boolean;
  url: string;
  position: number | null;
  contentType: string;
  secured: boolean;
}
