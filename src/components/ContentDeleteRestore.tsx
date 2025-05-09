import React from 'react';
import api from '@src/services/api.config';
import { FC } from 'react';
import { Link, redirect } from 'react-router-dom';
import { CloudFile } from '@src/types/cloudFile';


type ContentDeleteRestoreProps = {
  file: CloudFile,
  deleted: boolean,
  setDeleted: (deleted: boolean) => void
}

export const ContentDeleteRestore:FC<ContentDeleteRestoreProps> = ({file, deleted, setDeleted}) => {

  const handleDelete = async () => {
    const response = await api.delete(`/cloud_files/${file.md5}`);
    if (response.status === 204) {
      setDeleted(true);
      redirect('/files');
    }
  }

  const handleRestore = async () => {
    const response = await api.patch(`/cloud_files/${file.md5}/restore`);
    if (response.status === 204) {
      setDeleted(false);
      redirect('/files');
    }
  }

  return(
    <div className="delete-restore">
      {
        deleted ?
          <Link to="#" onClick={handleRestore}>restore</Link> :
            <Link to="#" onClick={handleDelete}>delete</Link>
      }
    </div>
  )
}

