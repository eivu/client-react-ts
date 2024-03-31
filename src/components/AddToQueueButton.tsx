import { CgPlayListAdd } from "react-icons/cg";
import { useAppContext } from '../store/AppContext';

const AddToQueueButton:FC = ({item}) => {
  const { dispatch, queue } = useAppContext();

  function handleClick():void {
    dispatch({type: 'addQueueItem', queueItem: item});
    console.log('queue', queue);
  }

  return (
    <div className='float-left'>
      <CgPlayListAdd  size={32} className='cursor-pointer' onClick={() => handleClick()}/>
    </div>
  );
}

export default AddToQueueButton;