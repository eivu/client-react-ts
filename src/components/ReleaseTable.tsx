import React from 'react';
// import { timeAgo } from '../@src/common/timeAgo';
// import { useMediaState } from '@vidstack/react';
// import { useMemo, useState, useEffect, FC } from 'react';
import { CiStar as Star } from "react-icons/ci";
import { LuGauge as Gauge } from "react-icons/lu";
import { Release } from '@src/types/release';
import { Link } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import convertSecondsToTimeHhMmSs from '@src/common/convertSecondsToTimeHhMmSs';
import { Track } from '@src/types/track';
import { MiniLoader } from './Loader';
import AddToQueueButton from './AddToQueueButton';
import AVButton from './AVButton';
import { objectToQueueItem } from '@src/common/objectToQueueItem';



export type ReleaseTableProps = {
  release: Release;
};

export function ReleaseTable({ release }: ReleaseTableProps): React.JSX.Element {
  return (
    <table id={`release-details-table-${release.id}`} className="release-table font-mono" key={`release-table-${release.id}`}>
      <thead>
        <tr>
          <th id="controlsHeader"></th>
          { release.multiBundle &&
            <th id="bundleHeader">
              Bun<span className="mobile-hidden-600">dle</span>
            </th>
          }
          <th id="positionHeader">
            Pos<span className="mobile-hidden-600">ition</span>
          </th>
          <th id="nameHeader">
            Name
          </th>
          <th id="durationHeader">
            Duration
          </th>
          <th id="filesizeheader" className="mobile-hidden-500">
            Size
          </th>
          <th id="ratingHeader" className="mobile-hidden-600">
            {/* Rating */}
            <span id="rating-icon-wrapper">
              <Star id="rating-icon" size={20} />
            </span>
          </th>
          <th id="numPlaysHeader" className="mobile-hidden-700">
            {/* Plays */}
            <span id="numPlays-icon-wrapper">
              <Gauge id="numPlays-icon" size={20} />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          release.tracks.length > 0 ?
            release.tracks.map((track) => (
              <tr key={`track-${track.md5}`}>
                <td className="controlsCol controls pr-2">
                  <AVButton item={objectToQueueItem(track)} />
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
                <td className="nameCol break-words">
                  <Link to={`/files/${track.md5}`}>{track.name}</Link>
                </td>
                <td className="durationCol">
                  {track.duration && convertSecondsToTimeHhMmSs(track.duration)}
                </td>
                <td className="filesizeCol mobile-hidden-500">
                  {prettyBytes(track.filesize)}
                </td>
                <td className="ratingCol mobile-hidden-600">
                  { track.rating }
                </td>
                <td className="numPlaysCol mobile-hidden-700">
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