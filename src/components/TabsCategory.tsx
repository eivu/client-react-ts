import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink } from './TabCategoryLink';
import { getCurrentUser } from '../services/auth.service';


const CateogryTabs: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [authStatus, setAuthStatus] = useState('logged-out');
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';
  const user = getCurrentUser();

  useEffect(() => {
    user ? setAuthStatus('logged-in') : setAuthStatus('logged-out');
  }, [user])

  return (
    <div id="tab-category-wrapper">
      <TabCategoryLink category={null} label={'EVERYTHING'} authStatus={authStatus} />
      <TabCategoryLink category="audio" label={'Audio'} authStatus={authStatus} />
      <TabCategoryLink category="video" label={'Video'} authStatus={authStatus} />
      <TabCategoryLink category="image" label={'Image'} authStatus={authStatus} />

      <div id="archive-menu" className="group">
        <div id="tab-archive-wrapper" className="flex items-center justify-between space-x-5 bg-white px-4">
          <TabCategoryLink category={'archive'} label={'Archive '} authStatus={authStatus} subCategories={['text', 'pdf', 'comics', 'roms']} />
        </div>
        {
          authStatus === 'logged-in' &&
            <div id="header-hover-menu-items" className="invisible absolute z-50 flex bg-opacity-90 bg-white flex-col shadow-xl group-hover:visible">
              <TabCategoryLink category={'text'} label={'text'} authStatus={authStatus} />
              <TabCategoryLink category={'pdf'} label={'pdf'} authStatus={authStatus} />
              <TabCategoryLink category={'comics'} label={'comics'} authStatus={authStatus} />
            </div>
        }
      </div>
    </div>
  );
};

export default CateogryTabs
