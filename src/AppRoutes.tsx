import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Files from './pages/Files';
import Artists from './pages/Artists';
import Queue from './pages/Queue';
import PageTitle from './components/PageTitle';

const router = createBrowserRouter([
  {
    element: 
      <>
        <PageTitle title="EIVU" />
        <Files />
      </>,
    path: "/",
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Files" />
        <Files />
      </>,
    path: "/files"
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
        <Artists />
      </>,
    path: "/artists"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Releases" />
        <Files />
      </>,
    path: "/releases"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Folders" />
        <Files />
      </>,
    path: "/folders"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Metadata" />
        <Files />
      </>,
    path: "/metadata"
  },
  {
    element: 
      <>
        <PageTitle title="EIVU::Trash" />
        <Files />
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