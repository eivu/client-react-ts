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
    path: "files/:fileId",
    // loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },
    loader: async () => {
      return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    }

    // const url = import.meta.env.VITE_EIVU_SERVER_HOST + '/api/frontend/v1/cloud_files';
    // axios.get(url, {
    //   params: constructParams(sorting),
    //   headers: {
    //     'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_USER_TOKEN
    //   }})
    //   .then((response) => {
    //     setQueueItems(response.data.cloudFiles);
    //     setMeta(response.data.meta);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setResponseError(error.message);
    //   });
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