import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
import getPaginationItems from '../../common/getPaginationItems';
// import axios from 'axios';
import api from '../../configs/api';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMediaState } from '@vidstack/react';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type CloudFile from '../../types/cloudFile';
import type { Artist } from '../../types/artist';
import type { Release } from '../../types/release';
import { MiniLoader } from '../../components/Loader';
import convertSecondsToTimeHhMmSs from '../../common/convertSecondsToTimeHhMmSs';
import { TogglableMetadatumViewer } from '../../components/TogglableMetadatumViewer';



const File: React.FC = () => {
  const fileId = useLoaderData();
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<CloudFile>();
  const [responseError, setResponseError] = useState<string>('');

  // // From queue page
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  useEffect(() => {
    api.get(`/cloud_files/${fileId}`, {
      params: { category: null, delicate: false }}
    ).then((response) => {
      setFile(response.data.cloudFile);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log("error:", responseError);
    })
  },[]);


  return (
    <DefaultLayout>
      {
        file && 
        <ContentHeader>::<Link to="/files" className="breadcrumb">Files</Link>::
          {
            file.secured ? file.md5 : file.name
          }
        </ContentHeader>
      }
      <ContentContainer>
        { loading ? <MiniLoader /> : file &&
          <table id="file-details-table" className="font-mono">
            <tbody className="align-baseline">
              <tr>
                <td>
                  Name
                </td>
                <td>
                  {file.name}
                </td>
              </tr>
              {
                file.artists.length > 0 &&
                  <tr>
                    <td>
                      Artist(s)
                    </td>
                    <td>
                      {file.artists.map(artist => <Link className="pr-2" to={`/artists/${artist.id}`} key={`artist-${artist.id}`}>{artist.name}</Link>)}
                    </td>
                  </tr>
              }
              {
                file.releases.length > 0 &&
                  <tr>
                    <td>
                      Release(s)
                    </td>
                    <td>
                      {file.releases.map(release => <Link to={`/releases/${release.id}`}>{release.name}</Link>)}
                    </td>
                  </tr>
              }
              {
                file.releasePos &&
                  <tr>
                    <td>
                      Release Pos
                    </td>
                    <td>
                      {file.releasePos}
                    </td>
                  </tr>
              }
              {
                file.state == 'completed' && file.duration && file.duration > 0 &&
                  <tr>
                    <td>
                      Duration
                    </td>
                    <td>
                      {convertSecondsToTimeHhMmSs(file.duration)}
                    </td>
                  </tr>
              }
              <tr>
                <td>
                  Content Type
                </td>
                <td>
                  {file.contentType}
                </td>
              </tr>
              <tr>
                <td>
                  NSFW
                </td>
                <td>
                  {file.nsfw ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td>
                  Secured
                </td>
                <td>
                  {file.secured ? "Yes" : "No"}
                </td>
              </tr>
              {
                file.filesize &&
                  <tr>
                    <td>
                      Filesize
                    </td>
                    <td>
                      {prettyBytes(file.filesize)}
                    </td>
                  </tr>
              }
              {
                file.year &&
                  <tr>
                    <td>
                      Year
                    </td>
                    <td>
                      {file.year}
                    </td>
                  </tr>
              }
              {
                file.description &&
                  <tr>
                    <td>
                      Description
                    </td>
                    <td>
                      {file.description}
                    </td>
                  </tr>
              }
              {
                file.rating &&
                  <tr>
                    <td>
                      Rating
                    </td>
                    <td>
                      {file.rating}
                    </td>
                  </tr>
              }
              <tr>
                <td>
                  Source
                </td>
                <td>
                  <Link to={file.url}>Link</Link>
                </td>
              </tr>
              {
                file.dateAquiredAt &&
                  <tr>
                    <td>
                      Num Plays
                    </td>
                    <td>
                      {timeAgo(file.date_aquiredAt)}
                    </td>
                  </tr>
              }
              <tr>
                <td>
                  State
                </td>
                <td>
                  {file.state}
                </td>
              </tr>
              <tr>
                <td>
                  Created At
                </td>
                <td>
                  {timeAgo(file.createdAt)}
                </td>
              </tr>
              <tr>
                <td>
                  Updated At
                </td>
                <td>
                  {timeAgo(file.updatedAt)}
                </td>
              </tr>
              <tr>
                <td>
                  Shared
                </td>
                <td>
                  {file.shared ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        }

        { file && file.metadata.length > 0 &&
          <>
            <div className="text-xl pt-20">Metadata</div>
            <table id="file-details-table" className="metadata">
              <tbody className="align-baseline">
                {
                  file.metadata.map((metadatum, index) => (
                    <tr key={`medatum-row-${metadatum.id}`}>
                      <td style={{borderTopStyle: 'solid'}}>
                        {metadatum.type}
                      </td>
                      <td style={{borderTopStyle: 'solid'}}>
                        {/* {
                          () => {
                            if (metadatum.explorable)
                              return <Link to={`/metadata/${metadatum.id}`}>{metadatum.value} [+]</Link>
                            // else if (metadatum.value.length > 100)
                              // return <TogglableMetadatumViewer text={metadatum.value} />
                            else
                              return metadatum.value
                          }
                        } */}
                        {
                          metadatum.explorable ?
                            <Link to={`/metadata/${metadatum.id}`}>{metadatum.value} [+]</Link>
                            : metadatum.value.length > 100 ?
                              <TogglableMetadatumViewer text={metadatum.value} />
                              : metadatum.value
                        }
                      </td>
                    </tr>
                  )) 
                }
              </tbody>
            </table>
          </>
        }
      </ContentContainer>
    </DefaultLayout>
  );
};

export default File;
