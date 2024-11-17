import {FC} from 'react';
import { useAppContext } from '../store/AppContext';
import { Link } from 'react-router-dom';
import { Category } from '../types/Category';


type TabCategoryLinkProps = {
  category: Category;
  label: string;
  authStatus: 'logged-in' | 'logged-out';
}

export const TabCategoryLink:FC = ({category, label, authStatus}:TabCategoryLinkProps) => {
  const { dispatch, activeCategory } = useAppContext();
  const activeClasses = authStatus === 'logged-in' ? 'text-primary border-primary' : "border-transparent";
  const inactiveClasses = 'border-transparent';

  return (
    <Link
      to="#"
      className={`
        ${authStatus === 'logged-in' ? 'tab-category' : 'tab-label'}
        ${category === activeCategory ? activeClasses : inactiveClasses}
      `}
      onClick={() => dispatch({type: 'setActiveCategory', activeCategory: category})}
    >
      {label}
    </Link>
  );
}