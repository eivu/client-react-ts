import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { CiStar as Star } from "react-icons/ci";
import type { QueueItem } from '../types/queueItem';
import { MiniLoader } from './Loader';
import prettyBytes from 'pretty-bytes';
import { timeAgo } from '../common/timeAgo';
import AVButton from './AVButton';
import AddToQueueButton from './AddToQueueButton';
import { FileIcon } from './FileIcon';


import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

type FilesTableProps = {
  queueItems: QueueItem[];
  loading: boolean;
  responseError: string | undefined;
  searchTerm: string;
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}


export const FilesTable: FC<FilesTableProps> = ({ queueItems, loading, responseError, sorting, setSorting, searchTerm }) => {
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
        className: 'break-words',
        cell: info => (
          <span>
            <div className="icon"><FileIcon contentType={info.row.original.contentType} /></div>
            <Link to={`/files/${info.row.original.md5}`}>{info?.getValue()}</Link>
          </span>
        )
      },
      {
        header: 'Size',
        accessorKey: 'filesize',
        cell: info => <span>{info?.getValue() && prettyBytes(info?.getValue())}</span>
      },
      {
        // header: 'Rating',
        header: <span id="rating-icon-wrapper"><Star id="rating-icon" size={20} /></span>,
        accessorKey: 'rating',
        headerClassName: 'mobile-hidden-500',
        className: "mobile-hidden-500",
      },
      {
        header: '# Plays',
        accessorKey: 'numPlays',
        headerClassName: 'mobile-hidden-600',
        className: "mobile-hidden-600",
      },
      {
        header: 'Last Viewed',
        headerClassName: 'mobile-hidden-850',
        className: "mobile-hidden-850",
        accessorKey: 'lastViewedAt',
        cell: info => <span>{timeAgo(info?.getValue())}</span>
      },
      {
        header: 'Uploaded',
        headerClassName: 'mobile-hidden-900',
        className: "mobile-hidden-900",
        accessorKey: 'uploadedAt',
        cell: info => <span>{timeAgo(info?.getValue())}</span>
      },
    ],
    []
  )

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


  return (
    <table id="files-table" className="datatable-table border-collapse overflow-hidden  px-4 md:overflow-auto md:px-8">
      <thead >
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} id={`${header.id}Header`} className={header.column.columnDef.headerClassName}> 
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
            <td colSpan={columns.length} className={cell.column.className}>
              <div className="flex items-center justify-center">
                {responseError}
              </div>
            </td>
          </tr>
        }
        {
          !loading && !!searchTerm && queueItems.length === 0 &&
          <tr>
            <td colSpan={columns.length}>
              <div className="flex items-center justify-center">
                No matching files found.  Please try another search term.
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
                    <td key={cell.id} className={`${cell.column.columnDef.className} ${cell.column.id}Col`}>
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
  );
}