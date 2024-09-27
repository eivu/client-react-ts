import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilesIndex from './pages/Files';
import File from './pages/Files/show';
import api from './configs/api';
import ArtistsIndex from './pages/Artists';
import Queue from './pages/Queue';
import PageTitle from './components/PageTitle';
import ReleasesIndex from './pages/Releases';
import FoldersIndex from './pages/Folders';
import MetadataIndex from './pages/Metadata';
import TrashIndex from './pages/Trash';
import CloudFile from './types/cloudFile';

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
    // it renders this element
    element: <File />,

    // when the URL matches this segment
    path: "/files/:fileId",
    loader: async ({ params }) => {
      return api.get(`/cloud_files/${params.fileId}`);
    },
    // loader: async ({ params }) => {
    //   console.log(params)
    //   return await api.get<CloudFile>(`/cloud_files/${params.fileId}`).then(
    //     (response) => {
    //       response.data;
    //     });
    // }
    // loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },
    //    loader: async ({ params }) => {
    //    return api.get<CloudFile>(`/cloud_files/${params.fileId}`).then(
    //         (response) => {
    //           response.data;
    //         });
    // },
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