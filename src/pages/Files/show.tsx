import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../services/api';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useState, useEffect, FC } from 'react';
import type { CloudFile } from '../../types/cloudFile';
import { MiniLoader } from '../../components/Loader';
import convertSecondsToTimeHhMmSs from '../../common/convertSecondsToTimeHhMmSs';
import { TogglableMetadatumViewer } from '../../components/TogglableMetadatumViewer';
import { ContentViewer } from '../../components/ContentViewer';
import { ContentDeleteRestore } from '../../components/ContentDeleteRestore';


const File: FC = () => {
  const fileId = useLoaderData();
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<CloudFile>();
  const [responseError, setResponseError] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    api.get(`/cloud_files/${fileId}`, {
      params: { category: null, delicate: false }}
    ).then((response) => {
      setFile(response.data.cloudFile);
      console.log("file:", response.data.cloudFile);
      setLoading(false);
      setDeleted(response.data.cloudFile.deletable);
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
        <ContentHeader>
          ::
          {
            deleted ?
              <Link to="/trash" className="breadcrumb">Trash</Link> :
                <Link to="/files" className="breadcrumb">Files</Link> 
          }::
          {
            file.secured ? file.md5 : file.name
          }
        </ContentHeader>
      }
      <ContentContainer>
        { loading ? <MiniLoader /> : file &&
          <>
            { file?.artworkUrl && <img src={file.artworkUrl} alt={file.name} className="file-coverart mr-4" /> }
            <ContentDeleteRestore file={file} deleted={deleted} setDeleted={setDeleted}/>
            <ContentViewer file={file} />
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
                        {file.releases.map(release => <Link to={`/releases/${release.id}`} key={`release-${release.id}`}>{release.name}</Link>)}
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
          </>
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
