import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import  { useAppContext } from '../../store/AppContext';
import getPaginationItems from '../../common/getPaginationItems';
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../../common/timeAgo';
import { useMemo, useState, useEffect, FC } from 'react';
import AddToQueueButton from '../../components/AddToQueueButton';
import AVButton from '../../components/AVButton';
import { QueueItem } from '../../types/queueItem';
import { MiniLoader } from '../../components/Loader';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'



const Files: React.FC = () => {
  const url = import.meta.env.VITE_EIVU_SERVER_HOST + '/api/frontend/v1/cloud_files';
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([{id: "label", desc: false}])
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
        accessorKey: 'label',
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
        accessorKey: 'createdAt',
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
      keyFormat: 'camel_lower'
    }
  }

  useEffect(() => {
    axios.get(url, {
      params: constructParams(sorting),
      headers: {
        'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_USER_TOKEN
      }})
      .then((response) => {
        setQueueItems(response.data.cloudFiles);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setResponseError(error.message);
      });
  },[sorting])

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
    pageCount: meta.totalPages,
  })

  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Eivu::Files</h2>
      </div>

      <section className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark  dark:bg-boxdark">
        <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
          {/* Search Field
          <div className="w-100">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
            />
          </div> */}

          {/* Num Entries
          <div className="flex items-center font-medium">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
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
            {table
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

        {/* <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
          <p className="font-medium">
            Showing {pageIndex + 1} 0f {pageOptions.length} pages
          </p>
          <div className="flex">
            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                  fill=""
                />
              </svg>
            </button>

            {pageOptions.map((_page, index) => (
              <button
                key={index}
                onClick={() => {
                  gotoPage(index);
                }}
                className={`${
                  pageIndex === index && 'bg-primary text-white'
                } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div> */}
      </section>
    </DefaultLayout>
  );
};

export default Files;
