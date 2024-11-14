import { useSearchParams } from 'react-router-dom';
import { AlphabetMenu } from '../../layout/AlphabetMenu';
import DefaultLayout, { ContentContainer, ContentHeader} from '../../layout/DefaultLayout';
import { PaginationMenu } from '../../layout/PaginationMenu';
import  { useAppContext } from '../../store/AppContext';
import api from '../../configs/api';
import { useState, useEffect, FC } from 'react';
import type { QueueItem } from '../../types/queueItem';
import { FilesTable } from '../../components/FilesTable';

type FilesIndexProps = {
  valid_files: boolean;
};

const FilesIndex: FC<FilesIndexProps> = ({ valid_files }) => {
// const FilesIndex: FC<FilesIndexProps> = (valid_files) => {
  const label = valid_files ? 'Files' : 'Trash';
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([{id: "name", desc: false}])
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
      valid_files: valid_files,
      letter: letter,
      search_term: searchTerm,
    }
  }

  useEffect(() => {
    setPageNum(1);
    setSearchParams({ pageNum: 1 });
    // setSearchParams({ pageNum: 1, letter: letter, s: searchTerm });
  },[activeCategory])

  useEffect(() => {
    setLoading(true);
    api.get('/cloud_files', {
      params: constructParams(sorting)})
      .then((response) => {
        setQueueItems(response.data.cloudFiles);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
      });
  },[sorting, pageNum, letter, searchTerm, activeCategory, valid_files])



  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    setSearchParams({ pageNum: pageNum.toString(), letter: letter });
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true);
      setPageNum(1);
      setLetter('');
      setSearchParams({ pageNum: 1, letter: '', s: event.target.value });
      setSearchTerm(event.target.value);
    }
  }

  function handleLetterChange(letter: string) {
    setLoading(true);
    setLetter(letter);
    setPageNum(1);
    setSearchParams({ pageNum: '1', letter: letter });
  }

  return (
    <DefaultLayout>
      <ContentHeader>
        ::{label}
      </ContentHeader>

      <section id="content-container" className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark  dark:bg-boxdark">
      <AlphabetMenu activeLetter={letter} collection="files" handleLetterChange={handleLetterChange} />

        <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
          {/* Search Field */}
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

          {/* Num Entries */}
          {/* <div className="flex items-center font-medium">
            <select
              // value={pageSize}
              // onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-transparent pl-2"
            >
              {[5, 10, 20, 50].map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
          </div> */}
        </div>

      <FilesTable
        queueItems={queueItems}
        loading={loading}
        responseError={responseError}
        sorting={sorting}
        searchTerm={searchTerm}
        setSorting={setSorting} />

      {
        !loading &&
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

export default FilesIndex;
