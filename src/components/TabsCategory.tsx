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


    <div class="group">

        <div class="flex items-center justify-between space-x-5 bg-white px-4">
            <a class="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4" onClick="">
                Choose Day
            </a>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </div>

        <div
            class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Sunday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Monday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Tuesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Wednesday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Thursday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Friday
            </a>

            <a class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                Saturday
            </a>

        </div>
    </div>


    </div>
  );
};

export default CateogryTabs
