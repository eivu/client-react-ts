import { useEffect, useState } from 'react';
import Loader from './common/Loader';
import { AppRoutes } from './AppRoutes';



function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? <Loader /> : <AppRoutes />;
}

export default App;
