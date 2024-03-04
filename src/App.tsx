import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Files from './pages/Files';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
              <Files />
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
  );
}

export default App;
