import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../layout/DefaultLayout';


export const Profile: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Profile
      </ContentHeader>

      <ContentContainer>
        Profile go here
      </ContentContainer>
    </DefaultLayout>
  );
};