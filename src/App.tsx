import { useEffect, useState } from 'react';
import Loader from './common/Loader';
import { AppRoutes } from './AppRoutes';
import { AppProvider } from './store/AppContext';



function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return <AppProvider>{loading ? <Loader /> : <AppRoutes />}</AppProvider>;
}

export default App;
