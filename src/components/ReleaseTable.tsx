
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
  const topRowKeyClassNames   = "";
  const topRowvalueClassNames = "";
  const valueClassNames = topRowvalueClassNames.concat(" border-t");
  return (
    <table id="release-details-table" className="release-table w-full text-left border-collapse font-mono" key={`release-table-${release.id}`}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          { release.multiBundle &&
            <th className={topRowKeyClassNames}>
              Bundle
            </th>
          }
          <th className={topRowKeyClassNames}>
            Position
          </th>
          <th className={topRowKeyClassNames}>
            Name
          </th>
          <th className={topRowKeyClassNames}>
            Duration
          </th>
          <th className={topRowKeyClassNames}>
            Size
          </th>
          <th className={topRowKeyClassNames}>
            Rating
          </th>
          <th className={topRowKeyClassNames}>
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
                <td className={valueClassNames}>
                  {track.bundlePos}
                </td>
            }
            <td className={valueClassNames}>
              {track.position}
            </td>
            <td className={valueClassNames}>
              <Link to={`/files/${track.md5}`}>{track.name}</Link>
            </td>
            <td className={valueClassNames}>
              {track.duration && convertSecondsToTimeHhMmSs(track.duration)}
            </td>
            <td className={valueClassNames}>
              {prettyBytes(track.filesize)}
            </td>
            <td className={valueClassNames}>
              { track.rating }
            </td>
            <td className={valueClassNames}>
              { track.numPlays }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}