import { FC, useEffect, useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../configs/api';
import { Metadatum } from '../../types/metadatum';
import { MiniLoader } from '../../components/Loader';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { QueueItem } from '../../types/queueItem';
import { PaginationMenu } from '../../layout/PaginationMenu';

const MetadatumPage: FC = () => {
  const medatatumId = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [metadatum, setMetadatum] = useState<Metadatum>();
  const [responseError, setResponseError] = useState<string>('');
  const [files, setFiles] = useState<QueueItem[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);

  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    setSearchParams({ pageNum: pageNum.toString() });
  }

  useEffect(() => {
    api.get(`/metadata/${medatatumId}`, {
      params: { page: pageNum, category: null, delicate: false }}
    ).then((response) => {
      console.log(response.data)
      setMetadatum(response.data.metadatum);
      setFiles(response.data.files);
      setMeta(response.data.meta);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  },[pageNum])
  return (
    <DefaultLayout>
      {/* PageTitle: ::{artist?.secured ? `Artist ${artist?.id}` : artist?.name} */}
      { metadatum &&
          <ContentHeader>::
            <Link to="/metadata" className="breadcrumb">Metadata</Link>::[{metadatum.type}]{metadatum.value}
          </ContentHeader>
      }
      {
        loading ?
          <MiniLoader /> : (
            <ContentContainer>
              {
                metadatum && metadatum.filesCount === 0 ?
                  <div className="text-center text-gray-500">No cloud files found</div> :
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Size</th>
                          <th>Rating</th>
                          <th># Plays</th>
                          <th>Last Viewed</th>
                          <th>Uploaded At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        files.map((file) => {
                          return (
                            <tr key={`metadatum-file-entry-${file.md5}`}>
                              <td></td>
                              <td><Link to={`/files/${file.md5}`}>{file.name}</Link></td>
                              <td>{prettyBytes(file.filesize)}</td>
                              <td>{file.rating}</td>
                              <td>{file.numPlays}</td>
                              <td>{file.lastViewedAt && timeAgo(file.lastViewedAt)}</td>
                              <td>{timeAgo(file.uploadedAt)}</td>
                            </tr>
                          )
                        })
                        }
                      </tbody>
                    </table>
              }
            </ContentContainer>
              
          )
      }
      {
        !loading &&
          <PaginationMenu
            pageNum={pageNum}
            totalPages={meta.totalPages}
            handlePageChange={handlePageChange}
            size={12} />
      }
    </DefaultLayout>
  );
};

export default MetadatumPage;
