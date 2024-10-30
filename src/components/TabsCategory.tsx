import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink } from './TabCategoryLink';

const CateogryTabs: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
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
    </div>
  );
};

export default CateogryTabs
