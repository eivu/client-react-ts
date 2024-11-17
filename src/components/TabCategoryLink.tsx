import {FC} from 'react';
import { useAppContext } from '../store/AppContext';
import { Link } from 'react-router-dom';
import { Category } from '../types/Category';


type TabCategoryLinkProps = {
  category: Category;
  label: string;
}

export const TabCategoryLink:FC = ({category, label}:TabCategoryLinkProps) => {
  const { dispatch, activeCategory } = useAppContext();
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  function handleCategoryClick() {
    dispatch({type: 'setActiveCategory', activeCategory: category});
  }

  return (
    <Link
      to="#"
      className={`tab-category ${
        category === activeCategory ? activeClasses : inactiveClasses
      }`}
      onClick={() => dispatch({type: 'setActiveCategory', activeCategory: category})}
    >
      {label}
    </Link>
  );
}