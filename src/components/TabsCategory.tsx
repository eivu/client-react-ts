import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink } from './TabCategoryLink';
import { getCurrentUser } from '../services/auth.service';

const CateogryTabs: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [authStatus, setAuthStatus] = useState('logged-out');
  const user = getCurrentUser();
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  useEffect(() => {
    const user = getCurrentUser();
    user ? setAuthStatus('logged-in') : setAuthStatus('logged-out');
  }, [user])

  return (
    <div id="tab-category-wrapper">
      <TabCategoryLink category={null} label={'EVERYTHING'} authStatus={authStatus} />
      <TabCategoryLink category="audio" label={'Audio'} authStatus={authStatus} />
      <TabCategoryLink category="video" label={'Video'} authStatus={authStatus} />
      <TabCategoryLink category="image" label={'Image'} authStatus={authStatus} />
      { false && <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 5 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(5)}
      >
        Delicates
      </Link> }
      <TabCategoryLink category={'archive'} label={'Archive'} authStatus={authStatus} />
      <TabCategoryLink category={'text'} label={'text'} authStatus={authStatus} />
      <TabCategoryLink category={'pdf'} label={'pdf'} authStatus={authStatus} />
      <TabCategoryLink category={'comics'} label={'comics'} authStatus={authStatus} />
    </div>
  );
};

export default CateogryTabs
