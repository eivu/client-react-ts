import { useSearchParams, useLoaderData, Link } from 'react-router-dom';
import { AlphabetMenu } from '@src/layout/AlphabetMenu';
import DefaultLayout, { ContentContainer, ContentHeader} from '@src/layout/DefaultLayout';
import { PaginationMenu } from '@src/layout/PaginationMenu';
import  { useAppContext } from '@src/store/AppContext';
import api from '@src/services/api.config';
import { useState, useEffect, FC } from 'react';
import type { QueueItem } from '@src/types/queueItem';
import { FilesTable } from '@src/components/FilesTable';
import { cleanseSearchParams } from '@src/common/cleanseSearchParams';
import { ErrorPanel } from '@src/components/ErrorPanel';


const MetadatumPage: FC = () => {
  const titlePrefix = "EIVU::Metadata::";
  const medatatumId = useLoaderData();
  const [metadataType, setMetadataType] = useState<string>('')
  const [metadatum, setMetadatum] = useState<Metadata>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchSubmittedAt, setSearchSubmittedAt] = useState<number>(Date.now());
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string | undefined>("Loading...");
  const [sorting, setSorting] = useState<SortingState>([{
    id: searchParams.get('sortBy') || 'name',
    desc: searchParams.get('sortDesc') || false
  }])
  const [responseError, setResponseError] = useState<string | undefined>(undefined);
  const [letter, setLetter] = useState<string>(searchParams.get('letter') || '');
  const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('pageNum')) || 1);
  const [meta, setMeta] = useState<any>({});
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('s') || '');
  const { activeCategory } = useAppContext();
  const constructParams = (sorting: SortingState) => {
    return {
      category: activeCategory,
      delicate: false,
      sortBy: sorting[0]?.id,
      page: pageNum,
      sortDesc: sorting[0]?.desc,
      letter: letter,
      search_term: searchTerm,
    }
  }

  useEffect(() => {
    setTitle(responseError 
              ?  'Err0r' :
                metadatum?.secured
                  ? `[${metadataType}]Metadatum ${metadatum?.id}` : `[${metadataType}]${metadatum?.value}`);
    document.title = titlePrefix + title ;
  }, [metadatum, title])

  useEffect(() => {
    setLoading(true);
    setSearchParams(cleanseSearchParams(searchParams));
    api.get(`/metadata/${medatatumId}`, {
      params: constructParams(sorting)}
      // params: { page: pageNum, category: activeCategory, delicate: false }}
    ).then((response) => {
      setMetadatum(response.data.metadatum);
      setMetadataType(response.data.metadatum?.type);
      setQueueItems(response.data.files);
      setMeta(response.data.meta);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  },[sorting, pageNum, letter, searchSubmittedAt, activeCategory])

  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    searchParams.set('pageNum', pageNum.toString());
    searchParams.set('letter', letter);
    searchParams.set('sortBy', sorting[0].id);
    searchParams.set('sortDesc', sorting[0].desc);
    setSearchParams(searchParams);
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true);
      setPageNum(1);
      setLetter('');
      setSearchSubmittedAt(Date.now());
      setSearchParams({ pageNum: 1, letter: '', s: event.target.value });
      setSearchTerm(event.target.value);
    }
  }

  // function handleLetterChange(letter: string) {
  //   event?.preventDefault();
  //   setLoading(true);
  //   setLetter(letter);
  //   setPageNum(1);
  //   searchParams.set('pageNum', '1');
  //   searchParams.set('letter', letter);
  //   searchParams.set('sortBy', sorting[0].id);
  //   searchParams.set('sortDesc', sorting[0].desc);
  //   // setSearchParams({pageNum: '1', letter, sortBy: sorting[0].id, sortDesc: sorting[0].desc});
  // }

  function handleSortChange(sorting: SortingState) {
    setSorting(sorting());
    searchParams.set('pageNum', '1');
    searchParams.set('sortBy', sorting()[0].id);
    searchParams.set('sortDesc', sorting()[0].desc);
    setSearchParams(searchParams);
  }

  return (
    <DefaultLayout>
      { !loading &&
          <ContentHeader>::
            <Link to="/metadata" className="breadcrumb">Metadata</Link>::{
              responseError 
                ? 'Err0r'
                : `[${metadataType}]${metadatum?.value} (${metadatum?.id})`
            }
          </ContentHeader>
      }

      <section id="content-container" className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark  dark:bg-boxdark">
      <div>
        {/* <AlphabetMenu activeLetter={letter} collection="files" handleLetterChange={handleLetterChange} /> */}
        {/* <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
          {/* Search Field * /}
          <div className="w-100">
            <input
              id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search..."
                onKeyDown={handleSearchKeyDown}
              />
          </div>
        </div> */}


        </div>
        {
          responseError ? <ErrorPanel errorMessage={responseError} /> :
        <FilesTable
        queueItems={queueItems}
        loading={loading}
        responseError={responseError}
        sorting={sorting}
        searchTerm={searchTerm}
        setSorting={handleSortChange} /> }
      {
        !loading && !responseError && meta.totalPages > 1 &&
          <PaginationMenu
            pageNum={pageNum}
            totalPages={meta.totalPages}
            handlePageChange={handlePageChange}
            size={12} />
      }
      </section>
    </DefaultLayout>
  );
};

export default MetadatumPage;
1