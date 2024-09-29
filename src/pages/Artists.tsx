import React from 'react';
import DefaultLayout, {AlphabetMenu, ContentContainer, ContentHeader} from '../layout/DefaultLayout';

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
