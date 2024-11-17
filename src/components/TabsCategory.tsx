import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink } from './TabCategoryLink';
import { getCurrentUser } from '../services/auth.service';

const CateogryTabs: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const user = getCurrentUser();
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';
  const status = user ? 'logged-in' : 'logged-out';

  return (
    <div id="tab-category-wrapper">
      <TabCategoryLink category={null} label={'EVERYTHING'} />
      <TabCategoryLink category="audio" label={'Audio'} />
      <TabCategoryLink category="video" label={'Video'} />
      <TabCategoryLink category="image" label={'Image'} />
      { false && <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 5 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(5)}
      >
        Delicates
      </Link> }
      <TabCategoryLink category={'archive'} label={'Archive'} />
      <TabCategoryLink category={'text'} label={'text'} />
      <TabCategoryLink category={'pdf'} label={'pdf'} />
      <TabCategoryLink category={'comics'} label={'comics'} />
    </div>
  );
};

export default CateogryTabs
