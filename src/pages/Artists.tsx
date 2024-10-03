import React from 'react';
import DefaultLayout, { ContentContainer, ContentHeader} from '../layout/DefaultLayout';
import { AlphabetMenu } from '../layout/AlphabetMenu';

const Artists: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Artists</span>
      </ContentHeader>
      <ContentContainer>
        <AlphabetMenu collection="artists" />

        Artists go here
      </ContentContainer>
    </DefaultLayout>
  );
};

export default Artists;
