import { Metadatum } from "./metadatum"
import { Artist } from "./artist"
import { Release } from "./release"

export interface CloudFile {
  name: string
  asset: string
  md5: string
  contentType: string
  filesize: number
  description: string | null
  rating: number | null
  nsfw: boolean
  secured: boolean
  uploadedAt: string
  updatedAt: string
  infoUrl: string | null
  duration: number
  extId: string | null
  dataSourceId: string | null
  release_id: string | null
  year: number | null
  releasePos: number | null
  numPlays: number
  state: string
  lastViewedAt: string | null
  deletable: boolean
  dateAquiredAt: string | null
  shared: boolean
  bucketUuid: string | null
  bucketName: string | null
  userUuid: string 
  folderUuid: string | null
  artworkUrl: string | null
  artworkMd5: string | null
  metadata: Metadatum[]
  artists: Artist[]
  releases: Release[]
  delicate: boolean
  url: string
};
