import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CateogryTabs: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
      <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 1 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(1)}
      >
        EVERYTHING
      </Link>
      <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 2 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(2)}
      >
        Video
      </Link>
      <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 3 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(3)}
      >
        Team
      </Link>
      <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 4 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(4)}
      >
        Audio
      </Link>
      <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 4 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(4)}
      >
        Archive
      </Link>
    </div>
  );
};

export default CateogryTabs
