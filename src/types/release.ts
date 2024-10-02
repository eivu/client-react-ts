import { Artist } from './artist';
import { Track } from './track';

export interface Release {
  id: number;
  name: string;
  ext_id: string | null;
  data_source_id: number | null;
  cloud_files_count: number;
  release_type_id: number | null;
  bundle_pos: number | null;
  peepy: boolean;
  nsfw: boolean;
  created_at: string;
  updated_at: string;
  primary_artist_id: number | null;
  artwork_id: number | null;
  year: number | null;
  rating: number | null;
  description: string | null;
  info_url: string | null;
  shared: boolean;
  artists: Artist[];
  tracks: Track[];
  secured: boolean;
};
