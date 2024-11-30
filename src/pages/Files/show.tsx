import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../services/api.config';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useState, useEffect, FC } from 'react';
import type { CloudFile } from '../../types/cloudFile';
import { MiniLoader } from '../../components/Loader';
import convertSecondsToTimeHhMmSs from '../../common/convertSecondsToTimeHhMmSs';
import { TogglableMetadatumViewer } from '../../components/TogglableMetadatumViewer';
import { ContentViewer } from '../../components/ContentViewer';
import { ContentDeleteRestore } from '../../components/ContentDeleteRestore';
import { ErrorPanel } from '../../components/ErrorPanel';

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
      // console.log("file:", response.data.cloudFile);
      setLoading(false);
      setDeleted(response.data.cloudFile.deletable);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log("file show error:", responseError);
    })
  },[]);


  return (
    <DefaultLayout>
      {
        !loading && 
        <ContentHeader>
          ::
          {
            deleted ?
              <Link to="/trash" className="breadcrumb">Trash</Link> :
                <Link to="/files" className="breadcrumb">Files</Link> 
          }::
          {
            responseError ? 'Err0r' :
              file.secured ? file.md5 : file.name
          }
        </ContentHeader>
      }
      <ContentContainer>
        { loading ? <MiniLoader /> : 
        
            responseError ? <ErrorPanel errorMessage={responseError} /> :
              <div id="file-details">
                { file?.artworkUrl && <img src={file.artworkUrl} alt={file.name} className="file-coverart mr-4" /> }
                <ContentDeleteRestore file={file} deleted={deleted} setDeleted={setDeleted}/>
                <ContentViewer file={file} />
                <table id="file-details-table" className="font-mono">
                  <tbody className="align-baseline">
                    <tr>
                      <td className="file-key-col">
                        Name
                      </td>
                      <td className="file-key-col">
                        {file.name}
                      </td>
                    </tr>
                    {
                      file.artists.length > 0 &&
                        <tr>
                          <td className="file-key-col">
                            Artist(s)
                          </td>
                          <td className="file-key-col">
                            {file.artists.map(artist => <Link className="pr-2" to={`/artists/${artist.id}`} key={`artist-${artist.id}`}>{artist.name}</Link>)}
                          </td>
                        </tr>
                    }
                    {
                      file.releases.length > 0 &&
                        <tr>
                          <td className="file-key-col">
                            Release(s)
                          </td>
                          <td className="file-key-col">
                            {file.releases.map(release => <Link to={`/releases/${release.id}`} key={`release-${release.id}`}>{release.name}</Link>)}
                          </td>
                        </tr>
                    }
                    {
                      file.releasePos &&
                        <tr>
                          <td className="file-key-col">
                            Release Pos
                          </td>
                          <td className="file-key-col">
                            {file.releasePos}
                          </td>
                        </tr>
                    }
                    {
                      file.state == 'completed' && file.duration && file.duration > 0 &&
                        <tr>
                          <td className="file-key-col">
                            Duration
                          </td>
                          <td className="file-key-col">
                            {convertSecondsToTimeHhMmSs(file.duration)}
                          </td>
                        </tr>
                    }
                    <tr>
                      <td className="file-key-col">
                        Content Type
                      </td>
                      <td className="file-key-col">
                        {file.contentType}
                      </td>
                    </tr>
                    <tr>
                      <td className="file-key-col">
                        NSFW
                      </td>
                      <td className="file-key-col">
                        {file.nsfw ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td className="file-key-col">
                        Secured
                      </td>
                      <td className="file-key-col">
                        {file.secured ? "Yes" : "No"}
                      </td>
                    </tr>
                    {
                      file.filesize &&
                        <tr>
                          <td className="file-key-col">
                            Filesize
                          </td>
                          <td className="file-key-col">
                            {prettyBytes(file.filesize)}
                          </td>
                        </tr>
                    }
                    {
                      file.year &&
                        <tr>
                          <td className="file-key-col">
                            Year
                          </td>
                          <td className="file-key-col">
                            {file.year}
                          </td>
                        </tr>
                    }
                    {
                      file.description &&
                        <tr>
                          <td className="file-key-col">
                            Description
                          </td>
                          <td className="file-key-col">
                            {file.description}
                          </td>
                        </tr>
                    }
                    {
                      file.rating &&
                        <tr>
                          <td className="file-key-col">
                            Rating
                          </td>
                          <td className="file-key-col">
                            {file.rating}
                          </td>
                        </tr>
                    }
                    <tr>
                      <td className="file-key-col">
                        Source
                      </td>
                      <td className="file-key-col">
                        <Link to={file.url}>Link</Link>
                      </td>
                    </tr>
                    {
                      file.dateAquiredAt &&
                        <tr>
                          <td className="file-key-col">
                            Num Plays
                          </td>
                          <td className="file-key-col">
                            {timeAgo(file.date_aquiredAt)}
                          </td>
                        </tr>
                    }
                    <tr>
                      <td className="file-key-col">
                        State
                      </td>
                      <td className="file-key-col">
                        {file.state}
                      </td>
                    </tr>
                    <tr>
                      <td className="file-key-col">
                        Created At
                      </td>
                      <td className="file-key-col">
                        {timeAgo(file.createdAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className="file-key-col">
                        Updated At
                      </td>
                      <td className="file-key-col">
                        {timeAgo(file.updatedAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className="file-key-col">
                        Shared
                      </td>
                      <td className="file-key-col">
                        {file.shared ? "Yes" : "No"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
