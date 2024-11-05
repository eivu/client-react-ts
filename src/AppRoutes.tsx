import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilesIndex from './pages/Files';
import File from './pages/Files/show';
import ArtistsIndex from './pages/Artists';
import Queue from './pages/Queue';
import PageTitle from './components/PageTitle';
import ReleasePage from './pages/Releases/show';
import ArtistPage from './pages/Artists/show';
import ReleasesIndex from './pages/Releases';
import FoldersIndex from './pages/Folders';
import MetadataIndex from './pages/Metadata';
import MetadatumPage from './pages/Metadata/show';
import { AuthPage } from './pages/Auth';

const router = createBrowserRouter([
  {
    element: 
      <>
        <PageTitle title="EIVU" />
        <FilesIndex valid_files={true} />
      </>,
    path: "/",
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Files" />
        <FilesIndex valid_files={true}/>
      </>,
    path: "/files"
  },
  {
    element: <File />,
    path: "/files/:fileId",
    loader: ({ params }) => {
      return params.fileId;
    },
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Queue" />
        <Queue />
      </>,
    path: "/queue"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Artists" />
        <ArtistsIndex />
      </>,
    path: "/artists"
  },
  {
    element: <ArtistPage />,
    path: "/artists/:artistId",
    loader: ({ params }) => {
      return params.artistId;
    },
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Releases" />
        <ReleasesIndex />
      </>,
    path: "/releases"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Releases" />
        <ReleasePage />
      </>,
    path: "/releases/:releaseId",
    loader: ({ params }) => {
      return params.releaseId;
    },
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Folders" />
        <FoldersIndex />
      </>,
    path: "/folders"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Metadata" />
        <MetadataIndex />
      </>,
    path: "/metadata"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Metadatum" />
        <MetadatumPage />
      </>,
    path: "/metadata/:metadatumId",
    loader: ({ params }) => {
      return params.metadatumId;
    },
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Trash" />
        <FilesIndex valid_files={false} />
      </>,
    path: "/trash"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Auth" />
        <AuthPage />
      </>,
    path: "/auth"
  },
]);



export const AppRoutes:React.FC = () => {
  // const { pathname } = useLocation();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return <RouterProvider router={router} />;

}