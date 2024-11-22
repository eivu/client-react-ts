import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink } from './TabCategoryLink';
import { getCurrentUser } from '../services/auth.service';
import { PiCaretDownBold as CaretDown } from "react-icons/pi";


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
      { false && <Link
        to="#"
        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
          openTab === 5 ? activeClasses : inactiveClasses
        }`}
        onClick={() => setOpenTab(5)}
      >
        Delicates
      </Link> }
      


    <div class="group">

        <div class="flex items-center justify-between space-x-5 bg-white px-4">
                  <TabCategoryLink category={'archive'} label={'Archive'} authStatus={authStatus} />

            <span>
                <CaretDown size="15" />
            </span>
        </div>

        <div
            class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

         <TabCategoryLink category={'text'} label={'text'} authStatus={authStatus} />
      <TabCategoryLink category={'pdf'} label={'pdf'} authStatus={authStatus} />
      <TabCategoryLink category={'comics'} label={'comics'} authStatus={authStatus} />

        </div>
    </div>


    </div>
  );
};

export default CateogryTabs
