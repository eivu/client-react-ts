import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';



const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div id="primaryWindow" className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      {/* <Footer /> */}
    </div>
  );
};

// export const AlphabetMenu(resource:String):React.FC<{ children: ReactNode }> = ({ children }) => {
// export const AlphabetMenu:React.FC<{ children: ReactNode }> = ({ children }) => {
export const AlphabetMenu:FC = ({ collection }): JSX.Element => {
  const alphabet:String[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return (
    <table className="w-full">
      <tbody>
        <tr>
           <td className="px-2 py-1">
            <Link to={`/${collection}?letter=`} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
              All
            </Link>
          </td>
          <td className="px-2 py-1">
            <Link to={`/${collection}?letter=#`} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
              #
            </Link>
          </td>
          {alphabet.map((letter, index) => (
            <td key={index} className="px-2 py-1">
              <Link to={`/${collection}?letter=${letter.toLowerCase()}`} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
                {letter}
              </Link>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export const ContentHeader:React.FC<{ children: ReactNode }> = ({ children }) => {
  return(
    <section id="content-header" className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        <Link to="/" className="breadcrumb">Eivu</Link>
        {children}
      </h2>
    </section>
  )
};

export const ContentContainer:React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section id="content-container" className="flex flex-col gap-7.5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 sm:p-6 xl:p-9">
          {children}
        </div>
      </div>
    </section>
  )
};    

export default DefaultLayout;
