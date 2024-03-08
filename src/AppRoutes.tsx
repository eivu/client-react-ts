import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Files from './pages/Files';
import Artists from './pages/Artists';
import PageTitle from './components/PageTitle';

export const AppRoutes:React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="EIVU" />
              <Files />
            </>
          }
        />
        <Route
          path="/files"
          element={
            <>
              <PageTitle title="EIVU::Files" />
              <Files />
            </>
          }
        />
        <Route
          path="/artists"
          element={
            <>
              <PageTitle title="EIVU::Artists" />
              <Artists />
            </>
          }
        />
        <Route
          path="/releases"
          element={
            <>
              <PageTitle title="EIVU::Releases" />
              <Files />
            </>
          }
        />
        <Route
          path="/folders"
          element={
            <>
              <PageTitle title="EIVU::Folders" />
              <Files />
            </>
          }
        />
        <Route
          path="/metadata"
          element={
            <>
              <PageTitle title="EIVU::Metadata" />
              <Files />
            </>
          }
        />
        <Route
          path="/trash"
          element={
            <>
              <PageTitle title="EIVU::Trash" />
              <Files />
            </>
          }
        />
      </Routes>
    </>
  )
}