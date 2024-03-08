import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Loader from './common/Loader';
import { AppRoutes } from './AppRoutes';
import { store } from './store/store'



function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return(
    <Provider store={store}>
      {loading ? <Loader /> : <AppRoutes />}
    </Provider>
  );
}

export default App;
