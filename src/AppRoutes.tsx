import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilesIndex from './pages/Files';
import File from './pages/Files/show';
import api from './configs/api';
import ArtistsIndex from './pages/Artists';
import Queue from './pages/Queue';
import PageTitle from './components/PageTitle';
import ReleasePage from './pages/Releases/show';
import ReleasesIndex from './pages/Releases';
import FoldersIndex from './pages/Folders';
import MetadataIndex from './pages/Metadata';
import TrashIndex from './pages/Trash';
import type CloudFile from './types/cloudFile';
import type { Release } from './types/release';



async function getCloudFile(fileId: string | undefined):CloudFile {
  try {
    const response = await api.get(`/cloud_files/${fileId}`);
    console.log(response.data?.cloudFile);

    const file:CloudFile = response.data?.cloudFile;
    return file;
  } catch(error) {
    console.log(error);
    throw error;
  };
}


const router = createBrowserRouter([
  {
    element: 
      <>
        <PageTitle title="EIVU" />
        <FilesIndex />
      </>,
    path: "/",
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Files" />
        <FilesIndex />
      </>,
    path: "/files"
  },
  {
    element: <File />,
    path: "/files/:fileId",
    loader: ({ params }) => {
      return getCloudFile(params.fileId);
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
        <PageTitle title="EIVU::Trash" />
        <TrashIndex />
      </>,
    path: "/trash"
  }
]);



export const AppRoutes:React.FC = () => {
  // const { pathname } = useLocation();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return <RouterProvider router={router} />;

}