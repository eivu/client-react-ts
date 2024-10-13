import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import  { useAppContext } from '../../store/AppContext';
import getPaginationItems from '../../common/getPaginationItems';
// import axios from 'axios';
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
import { TogglableViewer } from '../../components/TogglableViewer';



const File: React.FC = () => {
  const file:CloudFile  = useLoaderData();
  const topRowKeyClassNames   = "py-2 pr-2 font-mono font-medium leading-6 whitespace-nowrap border-slate-100 dark:border-slate-400/10"
  const keyClassNames   = topRowKeyClassNames.concat(" border-t")
  const topRowvalueClassNames = "break-words py-2 pl-2 font-mono leading-6 whitespace-pre border-slate-100 dark:border-slate-400/10 text-wrap"
  const valueClassNames = topRowvalueClassNames.concat(" border-t")

  // const [loading, setLoading] = useState<boolean>(true);
  // const [responseError, setResponseError] = useState<String | undefined>(undefined);
  // const [queueItems, setQueueItems] = useState<QueueItem[]>([]);

  // // From queue page
  // const { queue, queueIndex, player, dispatch } = useAppContext();
  // const isPlaying = useMediaState('playing', player);

  return (
    <DefaultLayout>
      <ContentHeader>::<Link to="/files" className="breadcrumb">Files</Link>::
        {
          file.secured ? file.md5 : file.label
        }
      </ContentHeader>
      <ContentContainer>
        <table id="file-details-table" className="w-full text-left border-collapse">
          <tbody className="align-baseline">
            <tr>
              <td className={topRowKeyClassNames}>
                Name
              </td>
              <td className={topRowvalueClassNames}>
                {file.label}
              </td>
            </tr>
            {
              file.artists.length > 0 &&
                <tr>
                  <td className={keyClassNames}>
                    Artist(s)
                  </td>
                  <td className={valueClassNames}>
                    {file.artists.map(artist => <Link to={`/artists/${artist.id}`}>{artist.name}</Link>)}
                  </td>
                </tr>
            }
            {
              file.releases.length > 0 &&
                <tr>
                  <td className={keyClassNames}>
                    Release(s)
                  </td>
                  <td className={valueClassNames}>
                    {file.releases.map(release => <Link to={`/releases/${release.id}`}>{release.name}</Link>)}
                  </td>
                </tr>
            }
            {
              file.releasePos &&
                <tr>
                  <td className={keyClassNames}>
                    Release Pos
                  </td>
                  <td className={valueClassNames}>
                    {file.releasePos}
                  </td>
                </tr>
            }
            {
              file.state == 'completed' && file.duration && file.duration > 0 &&
                <tr>
                  <td className={keyClassNames}>
                    Duration
                  </td>
                  <td className={valueClassNames}>
                    {convertSecondsToTimeHhMmSs(file.duration)}
                  </td>
                </tr>
            }
            <tr>
              <td className={keyClassNames}>
                Content Type
              </td>
              <td className={valueClassNames}>
                {file.contentType}
              </td>
            </tr>
            <tr>
              <td className={keyClassNames}>
                NSFW
              </td>
              <td className={valueClassNames}>
                {file.nsfw ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <td className={keyClassNames}>
                Secured
              </td>
              <td className={valueClassNames}>
                {file.secured ? "Yes" : "No"}
              </td>
            </tr>
            {
              file.filesize &&
                <tr>
                  <td className={keyClassNames}>
                    Filesize
                  </td>
                  <td className={valueClassNames}>
                    {prettyBytes(file.filesize)}
                  </td>
                </tr>
            }
            {
              file.year &&
                <tr>
                  <td className={keyClassNames}>
                    Year
                  </td>
                  <td className={valueClassNames}>
                    {file.year}
                  </td>
                </tr>
            }
            {
              file.description &&
                <tr>
                  <td className={keyClassNames}>
                    Description
                  </td>
                  <td className={valueClassNames}>
                    {file.description}
                  </td>
                </tr>
            }
            {
              file.rating &&
                <tr>
                  <td className={keyClassNames}>
                    Rating
                  </td>
                  <td className={valueClassNames}>
                    {file.rating}
                  </td>
                </tr>
            }
            <tr>
              <td className={keyClassNames}>
                Source
              </td>
              <td className={valueClassNames}>
                <Link to={file.url}>Link</Link>
              </td>
            </tr>
            {
              file.dateAquiredAt &&
                <tr>
                  <td className={keyClassNames}>
                    Num Plays
                  </td>
                  <td className={valueClassNames}>
                    {timeAgo(file.date_aquiredAt)}
                  </td>
                </tr>
            }
            <tr>
              <td className={keyClassNames}>
                State
              </td>
              <td className={valueClassNames}>
                {file.state}
              </td>
            </tr>
            <tr>
              <td className={keyClassNames}>
                Created At
              </td>
              <td className={valueClassNames}>
                {timeAgo(file.createdAt)}
              </td>
            </tr>
            <tr>
              <td className={keyClassNames}>
                Updated At
              </td>
              <td className={valueClassNames}>
                {timeAgo(file.updatedAt)}
              </td>
            </tr>
            <tr>
              <td className={keyClassNames}>
                Shared
              </td>
              <td className={valueClassNames}>
                {file.shared ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>

        { file.metadata.length > 0 &&
          <>
            <div className="text-xl pt-20">Metadata</div>
            <table id="file-details-table" className="w-full text-left border-collapse">
              <tbody className="align-baseline">
                {
                  file.metadata.map((metadatum, index) => (
                    <tr key={`medatum-row-${metadatum.id}`}>
                      <td className={index === 0 ? topRowKeyClassNames : keyClassNames}>
                        {metadatum.type}
                      </td>
                      <td className={index === 0 ? topRowvalueClassNames : valueClassNames}>
                        {/* {
                          () => {
                            if (metadatum.explorable)
                              return <Link to={`/metadata/${metadatum.id}`}>{metadatum.value} [+]</Link>
                            // else if (metadatum.value.length > 100)
                              // return <TogglableViewer text={metadatum.value} />
                            else
                              return metadatum.value
                          }
                        } */}
                        {
                          metadatum.explorable ?
                            <Link to={`/metadata/${metadatum.id}`}>{metadatum.value} [+]</Link>
                            : metadatum.value.length > 100 ?
                              <TogglableViewer text={metadatum.value} />
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
