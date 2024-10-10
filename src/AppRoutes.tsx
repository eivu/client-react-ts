import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilesIndex from './pages/Files';
import File from './pages/Files/show';
import api from './configs/api';
import ArtistsIndex from './pages/Artists';
import Queue from './pages/Queue';
import PageTitle from './components/PageTitle';
import ReleasePage from './pages/Releases/show';
import ArtistPage from './pages/Artists/show';
import ReleasesIndex from './pages/Releases';
import FoldersIndex from './pages/Folders';
import MetadataIndex from './pages/Metadata';
import TrashIndex from './pages/Trash';
import type CloudFile from './types/cloudFile';
import type { Release } from './types/release';
import type { Artist } from './types/artist';



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

async function getArtist(artistId: string | undefined):Artist {
  try {
    const response = await api.get(`/artists/${artistId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRelease(releaseId: string | undefined):Release {
  try {
    const response = await api.get(`/releases/${releaseId}`);
    console.log(response.data?.release);

    const release:Release = response.data?.release;
    return release;
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
    element: <ArtistPage />,
    path: "/artists/:artistId",
    loader: ({ params }) => {
      return getArtist(params.artistId);
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
      return getRelease(params.releaseId);
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