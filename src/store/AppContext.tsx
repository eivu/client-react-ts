import { createContext, useContext, useReducer, ReactNode } from 'react';
import { type MediaPlayerInstance, } from '@vidstack/react';
import { defaultQueue } from '../components/Player/defaultQueue';
import { QueueItem } from '../types/queueItem';

type State = {
  player: MediaPlayerInstance | undefined,
  queueIndex: number,
  queue: QueueItem[]
};


const initialState: State = {
  queueIndex: 0,
  queue: defaultQueue,
  player: undefined
}

type Action =
  | { type: 'setPlayer', player: any }
  | { type: 'setQueue', queue: QueueItem[] }
  | { type: 'setQueueIndex', queueIndex: number }
  | { type: 'incrementQueueIndex' }
  | { type: 'decrementQueueIndex' }
  | { type: 'clearQueue' }
  | { type: 'clearQueueItem' }
  | { type: 'addQueueItem', queueItem: QueueItem }
  | { type: 'removeQueueItem', queueItem: QueueItem }
  | { type: 'clearAll' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setPlayer':
      return { ...state, player: action.player };
    case 'setQueueIndex':
      return { ...state, queueIndex: action.queueIndex };
    case 'setQueue':
      return { ...state, queue: action.queue };
    case 'incrementQueueIndex':
      return { ...state, queueIndex: state.queueIndex + 1 };
    case 'decrementQueueIndex':
      return { ...state, queueIndex: Math.max(0, (state.queueIndex - 1))  };
    case 'clearQueue':
      return { ...state, queue: [] };
    case 'clearQueueItem':
      return { ...state, queueItem: undefined };
    case 'addQueueItem':
      return { ...state, queue: [...state.queue, action.queueItem] };
    case 'removeQueueItem':
      return { ...state, queue: state.queue.filter((item) => item.md5 !== action.queueItem.md5) };
    case 'clearAll':
      return { ...initialState };
    default:
      return state;
  }
}

type AppContextType = {
  dispatch: React.Dispatch<Action>
};

const AppContext = createContext<AppContextType> ({
  ...initialState,
  dispatch: () => {}
});

type Props = {
  children: ReactNode
};

export function AppProvider({children }: Props) {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [{ queueIndex, player, queue }, dispatch] =
    useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{queueIndex, player, queue, dispatch}}>
      {children}
    </AppContext.Provider>
  )
};

// export const currentQueueItem = (queue: QueueItem[]): QueueItem | undefined => queue.length > 0 ? queue[0] : undefined;
export const currentQueueItemMd5 = (queue: QueueItem[]): QueueItem | undefined => queue.length > 0 ? queue[0].md5 : undefined;
export const useAppContext = () => useContext(AppContext);
