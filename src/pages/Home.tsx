import { FC } from 'react';
import DefaultLayout, { ContentHeader, ContentContainer} from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>::Home</ContentHeader>
      <ContentContainer>
        <div>
          <p>Your videos</p>
          <p>Your music</p>
          <p>Anywhere</p>
          <p>Anytime</p>
          <p>On</p>
          <p>Any device</p>
              Powered by aws s3
        </div>
        <hr />
        With support from:
        <div>
          <Link to="https://www.bugsnag.com/">
            <img src="https://eivu.io/assets/bugsnag_logo-9796bfc71896bfba566ce96c9d2cb99b5f7b710ac63287c37321ac102f158ee9.png" alt="bugsnag logo" width="199" height="49" />
          </Link>
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};
