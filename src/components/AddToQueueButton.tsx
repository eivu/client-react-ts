import { CgPlayListAdd } from "react-icons/cg";
import { useAppContext } from '../store/AppContext';
import { QueueItem } from "../types/queueItem";

export type AddToQueueButtonProps = {
  item: QueueItem;
  size?: number;
}
const AddToQueueButton:FC = ({item, size=32}:AddToQueueButtonProps) => {
  const { dispatch, queue } = useAppContext();

  function handleClick():void {
    dispatch({type: 'addQueueItem', queueItem: item});
    console.log('queue', queue);
  }

  return (
    <div className='float-left'>
      <CgPlayListAdd  size={size} className='cursor-pointer' onClick={() => handleClick()}/>
    </div>
  );
}

export default AddToQueueButton;