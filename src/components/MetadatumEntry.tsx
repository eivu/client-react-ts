import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import api from '../configs/api';
import { CiSquarePlus, CiSquareMinus, CiSquareInfo } from "react-icons/ci";
import { Metadatum } from '../types/metadatum';



export type MetadataEntryProps = {
  metadatum: Metadatum;
}

export const MetadatumEntry: React.FC<MetadataEntryProps> = ({metadatum}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [files, setFiles] = useState<QueueItem[]>([]);
  const [responseError, setResponseError] = useState<String | undefined>(undefined);
  const { dispatch, queue } = useAppContext();

  function handleClick():void {
    // setExpanded(!expanded);
    if (!dataLoaded) {
      setLoading(true);
      api.get(`/metadata/${metadatum.id}/cloud_files`)
        .then((response) => {
          setFiles(response.data.cloudFiles);
          console.log("data", response.data);
          console.log("files", files);
          setLoading(false);
          setExpanded(true);
          setDataLoaded(true);
        })
        .catch((error) => {
          setLoading(false);
          setResponseError(error.message);
        });
    }
  }

  return (
    <div>
      { loading ? 
        <CiSquareInfo size={32} className='cursor-wait pr-2 expander' />
        : expanded ? 
            <CiSquareMinus
              size={32}
              className='cursor-pointer pr-2 expander'
              onClick={() => handleClick()}/> :
              <CiSquarePlus
                size={32}
                className='cursor-pointer pr-2 expander'
                onClick={() => handleClick()}/>      
      }
      <Link to={`/metadata/${metadatum.id}`}>
        <span className="type">{metadatum.type}</span>
        {metadatum.value}
      </Link>
      <span className="pl-2">
        ({ metadatum.cloudFilesCount })
      </span>
      {
        expanded && files?.length > 0 &&
        <div className="ml-10 border-slate-100 dark:border-slate-400/10 text-wrap border-t">
          {files.map((file) => (
            <div className="entry" key={`file-entry-${file.id}`}>
              <Link to={`/files/${file.md5}`}>{file.name}</Link>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
