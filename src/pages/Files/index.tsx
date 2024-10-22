import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentContainer, ContentHeader} from '../../layout/DefaultLayout';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { PaginationMenu } from '../../components/PaginationMenu';
import  { useAppContext } from '../../store/AppContext';
import api from '../../configs/api';
import getPaginationItems from '../../common/getPaginationItems';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import type { QueueItem } from '../../types/queueItem';
import { MiniLoader } from '../../components/Loader';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'



const FilesIndex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([{id: "name", desc: false}])
  const [responseError, setResponseError] = useState<String | undefined>(undefined);
  const [pageNum, setPageNum] = useState<number>(1);
  const [meta, setMeta] = useState<any>({});
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const columns = useMemo<ColumnDef<QueueItem>[]>(
    () => [
      {
        header: () => null,
        id: 'play',
        enableSorting: false,
        cell: info => (
          <span>
            <AVButton item={info.row.original} />
            {info.row.original?.contentType?.startsWith('audio') ? <AddToQueueButton item={info.row.original} /> : null}
          </span>
        )
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: info => (
          <Link to={`/files/${info.row.original.md5}`}>{info?.getValue()}</Link>
        )
      },
      {
        header: 'Size',
        accessorKey: 'filesize',
        cell: info => <span>{info?.getValue() && prettyBytes(info?.getValue())}</span>
      },
      {
        header: 'Rating',
        accessorKey: 'rating',
      },
      {
        header: '# Plays',
        accessorKey: 'numPlays',
      },
      {
        header: 'Last Viewed',
        accessorKey: 'lastViewedAt',
        cell: info => <span>{timeAgo(info?.getValue())}</span>
      },
      {
        header: 'Uploaded',
        accessorKey: 'uploadedAt',
        cell: info => <span>{timeAgo(info?.getValue())}</span>
      },
    ],
    []
  )

  const constructParams = (sorting: SortingState) => {
    return {
      category: null,
      delicate: false,
      sortBy: sorting[0]?.id,
      page: pageNum,
      sortDesc: sorting[0]?.desc,
      // keyFormat: 'camel_lower'
    }
  }

  useEffect(() => {
    api.get('/cloud_files', {
      params: constructParams(sorting)})
      .then((response) => {
        setQueueItems(response.data.cloudFiles);
        setMeta(response.data.meta);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
      });
  },[sorting, pageNum])

  const table = useReactTable({
    data: queueItems,
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualPagination: true, //turn off client-side pagination
  // rowCount: dataQuery.data?.rowCount, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    // pageCount: meta.totalPages,
  })

  function handlePageChange(pageNum: number) {
    setLoading(true);
    setPageNum(pageNum);
    console.log('pageNum', pageNum);
  }

  return (
    <DefaultLayout>
      <ContentHeader>
        ::Files
      </ContentHeader>


      <section id="content-container" className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark  dark:bg-boxdark">
        <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
          {/* Search Field */}
          <div className="w-100">
            <input
              type="text"
              // value={globalFilter}
              // onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
            />
          </div>

          {/* Num Entries */}
          <div className="flex items-center font-medium">
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
          </div>
        </div>
        <table id="files-table" className="datatable-table border-collapse overflow-hidden break-words px-4 md:overflow-auto md:px-8">
          <thead >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} id={`${header.id}Header`}> 
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <FaSortUp className='inline' />,
                            desc: <FaSortDown className='inline' />,
                            false: <FaSort  className='inline' />
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {
              responseError &&
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex items-center justify-center">
                    {responseError}
                  </div>
                </td>
              </tr>
            }
            {
              loading &&
              <tr>
                <td colSpan={columns.length}>
                  <MiniLoader />
                </td>
              </tr>
            }
            { !loading && table
              .getRowModel()
              .rows.slice(0, 100)
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id} className={`${cell.column.id}Col`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>

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
