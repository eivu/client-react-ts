import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from './components/Loader';
import { AppRoutes } from './AppRoutes';
import { AppProvider } from './store/AppContext';
import {v4 as uuidv4} from 'uuid';




function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies(['eivu']);
uuidv4()

  useEffect(() => {
    setCookie('Name', 'eivu', { path: '/' });
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return <AppProvider>{loading ? <Loader /> : <AppRoutes />}</AppProvider>;
}

export default App;
