import { FC } from 'react';
import DefaultLayout, { ContentHeader, ContentContainer} from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';

export const About: FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>::Home</ContentHeader>
      <ContentContainer>
        <p>what you have before you is a labor of love (now - 2012) years in the making. It's gone through several total rewrites, reenvionings, and rearchitectings but its now a live thing before your very eyes</p>

        <p>You're welcome! and i'm talking to me, not you. I actually have no idea who you are, how you got here, or what you're doing on this site</p>
      </ContentContainer>
    </DefaultLayout>
  );
};
