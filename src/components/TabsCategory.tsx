import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TabCategoryLink, TabSecureAccessToggle } from './TabCategoryObjects';
import { authStatus } from '../services/auth.service';

const CateogryTabs: React.FC = () => {
  return (
    <div id="tab-category-wrapper">
      <TabCategoryLink category={null} label={'EVERYTHING'} />
      <TabCategoryLink category="audio" label={'Audio'} />
      <TabCategoryLink category="video" label={'Video'} />
      <TabCategoryLink category="image" label={'Image'} />
      <TabSecureAccessToggle label={'Secured'} />

      <div id="archive-menu" className="group">
        <div id="tab-archive-wrapper" className="flex items-center justify-between space-x-5 bg-white px-4">
          <TabCategoryLink category={'archive'} label={'Archive '} subCategories={['text', 'pdf', 'comics', 'roms']} />
        </div>
        {
          authStatus() === 'logged-in' &&
            <div id="header-hover-menu-items" className="invisible absolute z-50 flex bg-opacity-90 bg-white flex-col shadow-xl group-hover:visible">
              <TabCategoryLink category={'text'} label={'text'} />
              <TabCategoryLink category={'pdf'} label={'pdf'} />
              <TabCategoryLink category={'comics'} label={'comics'} />
              <TabCategoryLink category={'roms'} label={'roms'} />
            </div>
        }
      </div>
    </div>
  );
};

export default CateogryTabs
