import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../layout/DefaultLayout';


export const Settings: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Settings
      </ContentHeader>

      <ContentContainer>
        Settings go here
      </ContentContainer>
    </DefaultLayout>
  );
};