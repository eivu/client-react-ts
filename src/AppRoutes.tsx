import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from './services/auth.service';
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
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { LogoutPage } from './pages/LogoutPage';

export const AppRoutes:React.FC = () => {

  const ProtectedRoutes = () => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    return <Outlet />;
  };

  const router = createBrowserRouter([
    {
      element: 
        <>
          <PageTitle title="EIVU" />
          { isLoggedIn() ? <Navigate to="/files" /> : <Home /> }
        </>,
      path: "/",
    },
    {
      element: 
        <>
          <PageTitle title="EIVU::Home" />
          <Home />
        </>,
      path: "/home",
    },
    {
      element: 
        <>
          <PageTitle title="EIVU::About" />
          <About />
        </>,
      path: "/about",
    },
    {
      element: 
        <>
          <PageTitle title="EIVU::Auth" />
          <Login />
        </>,
      path: "/login"
    },
    {
      element: <ProtectedRoutes />,
      children: [
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
        {
          element: 
            <>
              <PageTitle title="EIVU::History" />
              <History />
            </>,
          path: "/history"
        },
        {
          element: 
            <>
              <PageTitle title="EIVU::Settings" />
              <Settings />
            </>,
          path: "/settings"
        },
        {
          element: 
            <>
              <PageTitle title="EIVU::Profile" />
              <Profile />
            </>,
          path: "/profile"
        },
        {
          element: 
            <>
              <PageTitle title="EIVU::Logging out..." />
              <LogoutPage />
            </>,
          path: "/logout"
        },
      ]
    }
  ]);



  // const [user, setUser] = useState<User | null>(getCurrentUser());
  // const user = getCurrentUser();

  // React.useEffect(() => {
  //   const user = getCurrentUser();
  // }, [user]);

  return <RouterProvider router={router} />;

}