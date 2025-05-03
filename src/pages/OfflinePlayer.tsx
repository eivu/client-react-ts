import React from 'react'
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import FileDropZone from '@src/components/FileDropZone';

export const OfflinePlayer: React.FC = () => {

  return (
    <DefaultLayout>
      <ContentHeader>
        ::Offline Player
      </ContentHeader>

      <ContentContainer>
        <FileDropZone />
      </ContentContainer>
    </DefaultLayout>
  );
};