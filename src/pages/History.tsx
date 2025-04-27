import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';


export const History: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        ::History
      </ContentHeader>

      <ContentContainer>
        History goes here
      </ContentContainer>
    </DefaultLayout>
  );
};