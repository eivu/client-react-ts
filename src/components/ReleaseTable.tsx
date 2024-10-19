
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
import { AddToQueueButton } from './AddToQueueButton';
import { AVButton } from './AVButton';



export type ReleaseTableProps = {
  release: Release;
};

export function ReleaseTable({ release }: ReleaseTableProps): React.JSX.Element {
  const topRowKeyClassNames   = "py-2 pr-2 font-mono font-medium leading-6 whitespace-nowrap border-slate-100 dark:border-slate-400/10";
  const topRowvalueClassNames = "break-words py-2 pl-2 font-mono leading-6 whitespace-pre border-slate-100 dark:border-slate-400/10 text-wrap";
  const valueClassNames = topRowvalueClassNames.concat(" border-t");
  return (
    <table id="release-details-table" className="w-full text-left border-collapse" key={`release-table-${release.id}`}>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          { release.multiBundle &&
            <td className={topRowKeyClassNames}>
              Bundle
            </td>
          }
          <td className={topRowKeyClassNames}>
            Position
          </td>
          <td className={topRowKeyClassNames}>
            Name
          </td>
          <td className={topRowKeyClassNames}>
            Duration
          </td>
          <td className={topRowKeyClassNames}>
            Size
          </td>
          <td className={topRowKeyClassNames}>
            Rating
          </td>
          <td className={topRowKeyClassNames}>
            Plays
          </td>
        </tr>
        {release.tracks.map((track) => (
          <tr key={`track-${track.md5}`}>
            <td>
              {/* <AddToQueueButton track={track} /> */}
            </td>
            <td>
              {/* <AVButton track={track} /> */}
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