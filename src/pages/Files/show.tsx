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
import { ROM_FORMATS } from '../../components/ArcadePlayer';


const File: FC = () => {
  const fileId = useLoaderData();
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<CloudFile>();
  const [responseError, setResponseError] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);
  const fileKeyStyle = 'file-key-col';
  const fileValueStyle = 'file-value-col';
  const titlePrefix:string = 'Eivu::Files::';
  const [title, setTitle] = useState<string>('Loading...');
  const [platformPrefix, setPlatformPrefix] = useState<string>('');

  useEffect(() => {
    api.get(`/cloud_files/${fileId}`, {
      params: { category: null, delicate: false }}
    ).then((response) => {
      setFile(response.data.cloudFile);
      setLoading(false);
      setDeleted(response.data.cloudFile.deletable);
      setTitle(response.data.cloudFile.secured ? response.data.cloudFile.md5 : response.data.cloudFile.name);
      setPlatformPrefix(ROM_FORMATS[response.data.cloudFile.contentType]?.platform || '');
    }).catch((error) => {
      setLoading(false);
      setTitle('Err0r');
      setResponseError(error.message);
      console.log("file show error:", responseError);
    })
  },[]);


  useEffect(() =>{
    document.title =
      titlePrefix + 
      (platformPrefix ? `[${platformPrefix}]` : '') +
      title ;
  },[title])
  

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
          }::{
            platformPrefix ? `[${platformPrefix}]` : ''
          }{
            responseError ? 'Err0r': file?.name
          }
        </ContentHeader>
      }
      <ContentContainer>
        { loading ? <MiniLoader /> : 
        
            responseError ? <ErrorPanel errorMessage={responseError} /> :
              <div id="file-details">
                { file?.artworkUrl && <img src={file?.artworkUrl} alt={file?.name} className="file-coverart mr-4" /> }
                { file && <ContentDeleteRestore file={file} deleted={deleted} setDeleted={setDeleted}/> }
                { file && <ContentViewer file={file} /> }
                <table id="file-details-table" className="font-mono">
                  <tbody className="align-baseline">
                    <tr>
                      <td className={fileKeyStyle}>
                        Name
                      </td>
                      <td className={fileKeyStyle}>
                        {file?.name}
                      </td>
                    </tr>
                    {
                      (file?.artists ?? []).length > 0 &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Artist(s)
                          </td>
                          <td className={fileKeyStyle}>
                            {file?.artists.map(artist => <Link className="pr-2" to={`/artists/${artist.id}`} key={`artist-${artist.id}`}>{artist.name}</Link>)}
                          </td>
                        </tr>
                    }
                    {
                      (file?.releases || []).length > 0 &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Release(s)
                          </td>
                          <td className={fileValueStyle}>
                            {file?.releases.map(release => <Link to={`/releases/${release.id}`} key={`release-${release.id}`}>{release.name}</Link>)}
                          </td>
                        </tr>
                    }
                    {
                      file?.releasePos &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Release Pos
                          </td>
                          <td className={fileValueStyle}>
                            {file?.releasePos}
                          </td>
                        </tr>
                    }
                    {
                      file?.state == 'completed' && file?.duration && file?.duration > 0 &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Duration
                          </td>
                          <td className={fileValueStyle}>
                            {convertSecondsToTimeHhMmSs(file?.duration)}
                          </td>
                        </tr>
                    }
                    <tr>
                      <td className={fileKeyStyle}>
                        Content Type
                      </td>
                      <td className={fileValueStyle}>
                        {file?.contentType}
                      </td>
                    </tr>
                    <tr>
                      <td className={fileKeyStyle}>
                        NSFW
                      </td>
                      <td className={fileValueStyle}>
                        {file?.nsfw ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td className={fileKeyStyle}>
                        Secured
                      </td>
                      <td className={fileValueStyle}>
                        {file?.secured ? "Yes" : "No"}
                      </td>
                    </tr>
                    {
                      file?.filesize &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Filesize
                          </td>
                          <td className={fileValueStyle}>
                            {prettyBytes(file?.filesize)}
                          </td>
                        </tr>
                    }
                    {
                      file?.year &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Year
                          </td>
                          <td className={fileValueStyle}>
                            {file?.year}
                          </td>
                        </tr>
                    }
                    {
                      file?.description &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Description
                          </td>
                          <td className={fileValueStyle}>
                            {file?.description}
                          </td>
                        </tr>
                    }
                    {
                      file?.rating &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Rating
                          </td>
                          <td className={fileValueStyle}>
                            {file?.rating}
                          </td>
                        </tr>
                    }
                    {file?.url &&
                      <tr>
                        <td className={fileKeyStyle}>
                          Source
                        </td>
                        <td className={fileValueStyle}>
                          <Link to={file.url}>Link</Link>
                        </td>
                      </tr>
                    }
                    {
                      file?.dateAquiredAt &&
                        <tr>
                          <td className={fileKeyStyle}>
                            Num Plays
                          </td>
                          <td className={fileValueStyle}>
                            {timeAgo(file?.dateAquiredAt)}
                          </td>
                        </tr>
                    }
                    <tr>
                      <td className={fileKeyStyle}>
                        State
                      </td>
                      <td className={fileValueStyle}>
                        {file?.state}
                      </td>
                    </tr>
                    <tr>
                      <td className={fileKeyStyle}>
                        Created At
                      </td>
                      <td className={fileKeyStyle}>
                        {timeAgo(file?.createdAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className={fileKeyStyle}>
                        Updated At
                      </td>
                      <td className={fileKeyStyle}>
                        {timeAgo(file?.updatedAt)}
                      </td>
                    </tr>
                    <tr>
                      <td className={fileKeyStyle}>
                        Shared
                      </td>
                      <td className={fileKeyStyle}>
                        {file?.shared ? "Yes" : "No"}
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
