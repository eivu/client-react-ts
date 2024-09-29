import React from 'react';
import DefaultLayout, { AlphabetMenu, ContentHeader, ContentContainer} from '../../layout/DefaultLayout';

const ReleasesIndex: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        <span>::Releases</span>
      </ContentHeader>
      <ContentContainer>
        <AlphabetMenu collection="releases" />

        Releases go here
      </ContentContainer>
    </DefaultLayout>
  );
};

export default ReleasesIndex;
