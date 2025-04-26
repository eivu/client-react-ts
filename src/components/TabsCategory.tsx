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
              <TabCategoryLink category={'text'} label={'Text'} />
              <TabCategoryLink category={'pdf'} label={'Pdf'} />
              <TabCategoryLink category={'comics'} label={'Comics'} />
              <div className="group/roms relative">
                <TabCategoryLink category={'roms'} label={'Roms'} />
                <div className="invisible absolute z-50 flex bg-opacity-90 bg-white flex-col shadow-xl group-hover/roms:visible left-full top-0">
                  <TabCategoryLink category={'rom_atari_2600'} label={'Atari 2600'} />
                  <TabCategoryLink category={'rom_atari_5200'} label={'Atari 5200'} />
                  <TabCategoryLink category={'rom_atari_7800'} label={'Atari 7800'} />
                  <TabCategoryLink category={'rom_atari_jaguar'} label={'Atari Jaguar'} />
                  <TabCategoryLink category={'rom_atari_lynx'} label={'Atari Lynx'} />
                  <TabCategoryLink category={'rom_colecovision'} label={'Colecovision'} />
                  <TabCategoryLink category={'rom_gameboy'} label={'Gameboy'} />
                  <TabCategoryLink category={'rom_gameboy_advance'} label={'Gameboy Advance'} />
                  <TabCategoryLink category={'rom_gameboy_color'} label={'Gameboy Color'} />
                  <TabCategoryLink category={'rom_gamegear'} label={'Gamegear'} />
                  <TabCategoryLink category={'rom_genesis'} label={'Genesis'} />
                  <TabCategoryLink category={'rom_n64'} label={'N64'} />
                  <TabCategoryLink category={'rom_nes'} label={'NES'} />
                  <TabCategoryLink category={'rom_neogeo_pocket'} label={'NeoGeo Pocket'} />
                  <TabCategoryLink category={'rom_neogeo_pocket_color'} label={'NeoGeo Pocket Color'} />
                  <TabCategoryLink category={'rom_nintendo_ds'} label={'Nintendo DS'} />
                  <TabCategoryLink category={'rom_nintendo_3ds'} label={'Nintendo 3DS'} />
                  <TabCategoryLink category={'rom_sega_master_system'} label={'Sega Master System'} />
                  <TabCategoryLink category={'rom_sega_32x'} label={'Sega 32x'} />
                  <TabCategoryLink category={'rom_snes'} label={'SNES'} />
                  <TabCategoryLink category={'rom_turbografx_16'} label={'TurboGrafx 16'} />
                  <TabCategoryLink category={'rom_virtual_boy'} label={'Virtual Boy'} />
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default CateogryTabs
