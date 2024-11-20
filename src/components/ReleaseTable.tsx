
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
    <table id={`release-details-table-${release.id}`} className="release-table font-mono" key={`release-table-${release.id}`}>
      <thead>
        <tr>
          <th id="playheader"></th>
          <th id="addToQueueHeader"></th>
          { release.multiBundle &&
            <th id="bundleHeader">
              Bundle
            </th>
          }
          <th id="positionHeader">
            Position
          </th>
          <th id="nameHeader">
            Name
          </th>
          <th id="durationHeader">
            Duration
          </th>
          <th id="filesizeheader">
            Size
          </th>
          <th id="ratingHeader">
            Rating
          </th>
          <th id="numPlaysHeader">
            Plays
          </th>
        </tr>
      </thead>
      <tbody>
        {
          release.tracks.length > 0 ?
            release.tracks.map((track) => (
              <tr key={`track-${track.md5}`}>
                <td className="playCol controls">
                  <AVButton item={objectToQueueItem(track)} />
                </td>
                <td className="addToQueueCol controls pr-2">
                  <AddToQueueButton item={objectToQueueItem(track)} />
                </td>
                { 
                  release.multiBundle &&
                    <td className="bundleCol">
                      {track.bundlePos}
                    </td>
                }
                <td className="positionCol">
                  {track.position}
                </td>
                <td className="nameCol">
                  <Link to={`/files/${track.md5}`}>{track.name}</Link>
                </td>
                <td className="durationCol">
                  {track.duration && convertSecondsToTimeHhMmSs(track.duration)}
                </td>
                <td className="filesizeCol">
                  {prettyBytes(track.filesize)}
                </td>
                <td className="ratingCol">
                  { track.rating }
                </td>
                <td className="numPlaysCol">
                  { track.numPlays }
                </td>
              </tr>
            )) :
            <tr>
              <td colSpan={8} className="empty">
                Empty
              </td>
            </tr>
        }
      </tbody>
    </table>
  );
}