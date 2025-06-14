import React from 'react';
// import { timeAgo } from '../@src/common/timeAgo';
// import { useMediaState } from '@vidstack/react';
// import { useMemo, useState, useEffect, FC } from 'react';
import { CiStar as Star } from "react-icons/ci";
import { LuGauge as Gauge } from "react-icons/lu";
import { Playlist } from '@src/types/playlist';
import { Link } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import convertSecondsToTimeHhMmSs from '@src/common/convertSecondsToTimeHhMmSs';
import { PlaylistItem } from '@src/types/playlistItem';
import AddToQueueButton from './AddToQueueButton';
import AVButton from './AVButton';
import { objectToQueueItem } from '@src/common/objectToQueueItem';



export type PlaylistTableProps = {
  playlist: Playlist;
};

export function PlaylistTable({ playlist }: PlaylistTableProps): React.JSX.Element {
  return (
    <table id={`playlist-details-table-${playlist.id}`} className="playlist-table font-mono" key={`playlist-table-${playlist.id}`}>
      <thead>
        <tr>
          <th id="controlsHeader"></th>
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
          playlist.playlistItems.length > 0 ?
            playlist.playlistItems.map((playlistItem) => (
              <tr key={`playlistItem-${playlistItem.md5}`}>
                <td className="controlsCol controls pr-2">
                  <AVButton item={objectToQueueItem(playlistItem)} />
                  <AddToQueueButton item={objectToQueueItem(playlistItem)} />
                </td>
                <td className="positionCol">
                  {playlistItem.position}
                </td>
                <td className="nameCol break-words">
                  <Link to={`/files/${playlistItem.md5}`}>{playlistItem.name}</Link>
                </td>
                <td className="durationCol">
                  {playlistItem.duration && convertSecondsToTimeHhMmSs(playlistItem.duration)}
                </td>
                <td className="filesizeCol mobile-hidden-500">
                  {prettyBytes(playlistItem.filesize)}
                </td>
                <td className="ratingCol mobile-hidden-600">
                  {playlistItem.rating}
                </td>
                <td className="numPlaysCol mobile-hidden-700">
                  {playlistItem.numPlays}
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