import { CgPlayListAdd } from "react-icons/cg";
import { useAppContext } from '../store/AppContext';

const AddToQueueButton:FC = ({item}) => {
  const { queue } = useAppContext();

  return (
    <div>
      <CgPlayListAdd  size={32} className='cursor-pointer'/>
    </div>
  );
}

export default AddToQueueButton;