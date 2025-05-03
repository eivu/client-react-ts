import { FC } from 'react';
import DefaultLayout, { ContentHeader, ContentContainer} from '@src/layout/DefaultLayout';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>::Home</ContentHeader>
      <ContentContainer>
        <div id="definition">
          <p id="definition-overview">
            <span id="word">ei•vu</span>
            <span id="pronunciation">/ai-vu/</span>
            <span>noun (plural eivu)</span> 
          </p>
          <ol id="definitions-list" className="list-decimal list-outside">
            <li>An online platform allowing access to content stored via the s3 protocol. Especially useful for multimedia content</li>
            <li>It's like Plex but using your own s3 account</li>
            {/* <li>Serving x mp3, x images, x videos, x comics and other things</li> */}
            {/* <li>Serving x mp3, x images, x videos, x comics and other things</li> */}
            <li>
              <div>
                <p>Your videos</p>
                <p>Your music</p>
                <p>Anywhere</p>
                <p>Anytime</p>
                <p>On</p>
                <p>Any device</p>
                    Powered by aws s3
              </div>
              
            </li>
          </ol>
          <hr />
              With support from:
              <div>
                <Link to="https://www.bugsnag.com/">
                  <img src="/bugsnag_logo.png" alt="bugsnag logo" width="100" height="25" />
                </Link>
              </div>
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};
