import CloudFile from '../types/cloudFile';
import { QueueItem } from '../types/queueItem';
import { Track } from '../types/track';

export function objectToQueueItem(obj: CloudFile | Track): QueueItem {
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
    nsfw: obj.nsfw
  };
}