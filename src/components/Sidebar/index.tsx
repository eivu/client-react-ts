import React, { useEffect, useRef, FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '@src/store/AppContext';
import api from '@src/services/api.config';
import { getCurrentUser, authStatus } from '@src/services/auth.service';

const LoggedInItems: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <li>
        <NavLink
          to="/queue"
          className={`sidebar-nav-item ${pathname === '/' || pathname.includes('queue') && "active"
            }`}
        >
          Queue
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/artists"
          className={`sidebar-nav-item ${pathname === '/' || pathname.includes('artists') && "active"
            }`}
        >
          Artists
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/releases"
          className={`sidebar-nav-item ${pathname.includes('releases') &&
            "active"
            }`}
        >
          Releases
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/playlists"
          className={`sidebar-nav-item ${pathname.includes('playlists') &&
            "active"
            }`}
        >
          Playlists
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/files"
          className={`sidebar-nav-item ${pathname.includes('files') &&
            "active"
            }`}
        >
          Files
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/folders"
          className={`sidebar-nav-item ${
            pathname.includes('folders') &&
            "active"
          }`}
        >
          Folders
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/metadata"
          className={`sidebar-nav-item ${pathname.includes('metadata') &&
            "active"
            }`}
        >
          Metadata
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trash"
          className={`sidebar-nav-item ${pathname.includes('trash') &&
            "active"
            }`}
        >
          Trash
        </NavLink>
      </li>
    </>
  )
}

const LoggedOutItems: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <li>
        <NavLink
          to="/home"
          className={`sidebar-nav-item ${pathname === '/' || pathname.includes('home') && "active"
            }`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={`sidebar-nav-item ${pathname.includes('about') && "active"
            }`}
        >
          About
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/about"
          className={`sidebar-nav-item ${
            pathname.includes('login') && "active"                  
          }`}
        >
          Login
        </NavLink>
      </li> */}
    </>
  )
}


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const user = getCurrentUser();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {/* <img src={Logo} alt="Logo" /> */}
              EIVU
            </h1>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          {/* <div>whereami</div> */}
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}

          <ul className="mb-6 flex flex-col gap-1.5">
            {
              user ?
                <LoggedInItems /> :
                <LoggedOutItems />
            }
          </ul>
          {/* Promo/MP3/Artwork Area */}
          <div id="cover-art-frame" className={authStatus()}>
            <img src="/eivu008.png" />
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
