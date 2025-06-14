import { PlaylistItem } from './playlistItem';

export interface Playlist {
  id: number;
  name: string;
  description: string | null;
  userId: number;
  shared: boolean;
  externalId: string | null;
  playlistItemsCount: number;
  playlistItems: PlaylistItem[];
}
