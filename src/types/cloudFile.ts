import { Metadatum } from "./metadatum"

export default interface CloudFile {
  name: string | null
  asset: string | null
  md5: string | null
  content_type: string | null
  filesize: number | null
  description: string | null
  rating: string | null
  nsfw: boolean | null
  peepy: string | null
  created_at: string | null
  updated_at: string | null
  info_url: string | null
  duration: string | null
  ext_id: string | null
  data_source_id: string | null
  release_id: string | null
  year: number | null
  release_pos: number | null
  num_plays: number | null
  state: string | null
  last_viewed_at: string | null
  deletable: boolean | null
  date_aquired: string | null
  shared: boolean | null
  bucket_uuid: string | null
  bucket_name: string | null
  user_uuid: string | null
  folder_uuid: string | null
  artwork_md5: string | null
  metadata: Metadatum[]
  delicate: boolean | null
  url: string | null
};
