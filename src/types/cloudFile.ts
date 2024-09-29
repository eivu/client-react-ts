import { Metadatum } from "./metadatum"
import { Artist } from "./artist"
import { Release } from "./release"

export default interface CloudFile {
  name: string | null
  asset: string | null
  md5: string | null
  contentType: string | null
  filesize: number | null
  description: string | null
  rating: string | null
  nsfw: boolean | null
  secured: boolean | null
  createdAt: string | null
  updatedAt: string | null
  infoUrl: string | null
  duration: string | null
  extId: string | null
  dataSourceId: string | null
  release_id: string | null
  year: number | null
  releasePos: number | null
  numPlays: number | null
  state: string | null
  lastViewedAt: string | null
  deletable: boolean | null
  dateAquired: string | null
  shared: boolean | null
  bucketUuid: string | null
  bucketName: string | null
  userUuid: string | null
  folderUuid: string | null
  artworkMd5: string | null
  metadata: Metadatum[]
  artists: Artist[]
  releases: Release[]
  delicate: boolean | null
  url: string | null
};
