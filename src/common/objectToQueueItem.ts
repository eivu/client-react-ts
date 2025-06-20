import { CloudFile } from '@src/types/cloudFile';
import { QueueItem } from '@src/types/queueItem';
import { PlaylistItem } from '@src/types/playlistItem';
import { Track } from '@src/types/track';

export function objectToQueueItem(
  obj: CloudFile | Track | PlaylistItem
): QueueItem {
  return {
    filesize: obj.filesize,
    rating: obj.rating,
    numPlays: obj.numPlays,
    uploadedAt: obj.uploadedAt,
    lastViewedAt: obj.lastViewedAt,
    duration: obj.duration,
    name: obj.name,
    url: obj.url,
    md5: obj.md5,
    contentType: obj.contentType,
    secured: obj.secured,
    nsfw: obj.nsfw,
  };
}
