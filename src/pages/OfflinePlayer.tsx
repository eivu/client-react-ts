import React from 'react'
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import FileDropZone from '@src/components/FileDropZone';
import FormatsTest from '@src/components/FormatsTest';

export const OfflinePlayer: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Offline Player
      </ContentHeader>

      <ContentContainer>
        <FormatsTest />
        {/* <iframe src="/ejs.html" style={{ width: '100%', height: '100vh', border: 'none' }}></iframe> */}
        <FileDropZone />
      </ContentContainer>
    </DefaultLayout>
  );
};