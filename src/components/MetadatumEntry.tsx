import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import api from '../configs/api';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { Metadatum } from '../types/metadatum';



export type MetadataEntryProps = {
  metadatum: Metadatum;
}

export const MetadatumEntry: React.FC<MetadataEntryProps> = ({metadatum}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<String | undefined>(undefined);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const { dispatch, queue } = useAppContext();

  function handleClick():void {
  }

  return (
    <div>
      { expanded ? 
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
    </div>
  );
};
