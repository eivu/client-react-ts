export interface Artist {
  id: number;
  name: string;
  ext_id: string | null;
  data_source_id: number | null;
  cloud_files_count: number;
  releases_count: number;
  video_files_count: number;
  audio_files_count: number;
  peep_files_count: number;
  misc_files_count: number;
  created_at: string;
  updated_at: string;
  nsfw: boolean;
  secured: boolean;
  shared: boolean;
  artword_md5: string | null;
};
