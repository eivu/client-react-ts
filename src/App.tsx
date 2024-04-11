import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from './components/Loader';
import { AppRoutes } from './AppRoutes';
import { AppProvider } from './store/AppContext';
import uuid from 'react-uuid';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, setCookie]  = useCookies(['deviceUuid']);

  useEffect(() => {
    // set cookie for deviceUuid if not already set
    cookies.deviceUuid || setCookie('deviceUuid', uuid(), { path: '/' });
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return <AppProvider>{loading ? <Loader /> : <AppRoutes />}</AppProvider>;
}

export default App;
