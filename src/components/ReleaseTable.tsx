
import React from 'react';
// import { timeAgo } from '../../common/timeAgo';
// import { useMediaState } from '@vidstack/react';
// import { useMemo, useState, useEffect, FC } from 'react';
import { Release } from '../types/release';
import { Link } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import convertSecondsToTimeHhMmSs from '../common/convertSecondsToTimeHhMmSs';
import { Track } from '../types/track';
import { MiniLoader } from './Loader';
import AddToQueueButton from './AddToQueueButton';
import AVButton from './AVButton';
import { objectToQueueItem } from '../common/objectToQueueItem';



export type ReleaseTableProps = {
  release: Release;
};

export function ReleaseTable({ release }: ReleaseTableProps): React.JSX.Element {
  return (
    <table id="release-details-table" className="release-table font-mono" key={`release-table-${release.id}`}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          { release.multiBundle &&
            <th>
              Bundle
            </th>
          }
          <th>
            Position
          </th>
          <th>
            Name
          </th>
          <th>
            Duration
          </th>
          <th>
            Size
          </th>
          <th>
            Rating
          </th>
          <th>
            Plays
          </th>
        </tr>
      </thead>
      <tbody>
        {release.tracks.map((track) => (
          <tr key={`track-${track.md5}`}>
            <td className="controls">
              <AVButton item={objectToQueueItem(track)} />
            </td>
            <td className="controls pr-2">
              <AddToQueueButton item={objectToQueueItem(track)} />
            </td>
            { 
              release.multiBundle &&
                <td>
                  {track.bundlePos}
                </td>
            }
            <td>
              {track.position}
            </td>
            <td>
              <Link to={`/files/${track.md5}`}>{track.name}</Link>
            </td>
            <td>
              {track.duration && convertSecondsToTimeHhMmSs(track.duration)}
            </td>
            <td>
              {prettyBytes(track.filesize)}
            </td>
            <td>
              { track.rating }
            </td>
            <td>
              { track.numPlays }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}