import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { AppRoutes } from './AppRoutes';
import { AppProvider } from './store/AppContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AppProvider>
      { loading ? <Loader /> : <AppRoutes />}
      <Footer /> {/* Footer must be a sibling to AppRoutes so it won't refresh on 'url' change */}
    </AppProvider>
  );
}

export default App;
