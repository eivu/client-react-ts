import {FC} from 'react';
import { useAppContext } from '../store/AppContext';
import { Link } from 'react-router-dom';
import { Category } from '../types/Category';
import { PiCaretDownBold as CaretDown } from "react-icons/pi";
import { authStatus} from '../services/auth.service';

type TabCategoryLinkProps = {
  category: Category;
  label: string;
  subCategories?: Category[];
}

export const TabCategoryLink:FC<TabCategoryLinkProps> = ({category, label, subCategories }) => {
  const { dispatch, activeCategory } = useAppContext();
  const activeClasses = authStatus() === 'logged-in' ? 'active' : "inactive";
  const inactiveClasses = 'inactive';

  return (
    <Link
      to="#"
      id={`tab-${category}`}
      className={`
        ${authStatus() === 'logged-in' ? 'tab-category' : 'tab-label'}
        ${category === activeCategory || subCategories?.includes(activeCategory) ? activeClasses : inactiveClasses}
      `}
      onClick={() => dispatch({type: 'setActiveCategory', activeCategory: category})}
    >
      {label}
      { authStatus() === 'logged-in' && !!subCategories &&  <span className="caret-down"><CaretDown /></span> }
      {/* { authStatus === 'logged-in' && !!subCategories &&  <span className="caret-down"><CaretDown size="15" /></span> } */}

    </Link>
  );
}

type TabSecureAccessToggleProps = {
  label: string;
};

export const TabSecureAccessToggle: FC<TabSecureAccessToggleProps> = ({ label }) => {
  const { secureAccessExpiresAt, secured, dispatch } = useAppContext();
  const activeClasses = secured ? 'active' : 'inactive';
  const hasSecureAccess = ():boolean => {
    return secureAccessExpiresAt > Date.now();
  }

  const handleClick = ():void => {
    dispatch({type: 'setSecured'});
    console.log('secureAccessExpiresAt', secureAccessExpiresAt);
    console.log('secured', secured);
  }

  return (
    hasSecureAccess()
      ?
        <button className={`tab-category ${activeClasses}`} onClick={handleClick}>
          {label}
        </button>
      : <></>
  )
} 