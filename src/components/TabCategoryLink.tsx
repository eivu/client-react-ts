import {FC} from 'react';
import { useAppContext } from '../store/AppContext';
import { Link } from 'react-router-dom';
import { Category } from '../types/Category';
import { PiCaretDownBold as CaretDown } from "react-icons/pi";


type TabCategoryLinkProps = {
  category: Category;
  label: string;
  authStatus: 'logged-in' | 'logged-out';
  subCategories?: Category[];
}

export const TabCategoryLink:FC = ({category, label, authStatus, subCategories}:TabCategoryLinkProps) => {
  console.log(label, subCategories, );
  const { dispatch, activeCategory } = useAppContext();
  const activeClasses = authStatus === 'logged-in' ? 'active' : "inactive";
  const inactiveClasses = 'inactive';

  return (
    <Link
      to="#"
      className={`
        ${authStatus === 'logged-in' ? 'tab-category' : 'tab-label'}
        ${category === activeCategory || subCategories?.includes(activeCategory) ? activeClasses : inactiveClasses}
      `}
      onClick={() => dispatch({type: 'setActiveCategory', activeCategory: category})}
    >
      {label}
      { authStatus === 'logged-in' && !!subCategories &&  <span className="caret-down"><CaretDown size="15" /></span> }
    </Link>
  );
}