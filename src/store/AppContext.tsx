import { createContext, useContext, useReducer, ReactNode } from 'react';
import { type MediaPlayerInstance, } from '@vidstack/react';
import { defaultQueue } from '../components/Player/defaultQueue';
import type { QueueItem } from '../types/queueItem';
import type { Category } from '../types/Category';


type State = {
  player: MediaPlayerInstance | undefined,
  queueIndex: number,
  activeCategory: Category,
  secured: boolean,
  queue: QueueItem[]
};


const initialState: State = {
  queueIndex: 0,
  queue: defaultQueue,
  activeCategory: null,
  secured: false,
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
  | { type: 'addMultiQueueItems', queueItems: QueueItem[] }
  | { type: 'removeQueueItem', queueItem: QueueItem }
  | { type: 'clearAll' }
  | { type: 'setActiveCategory', activeCategory: Category };

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
    case 'addMultiQueueItems':
      return { ...state, queue: state.queue.concat(action.queueItems) };
    case 'removeQueueItem':
      return { ...state, queue: state.queue.filter((item) => item.md5 !== action.queueItem.md5) };
    case 'setActiveCategory':
      return { ...state, activeCategory: action.activeCategory };
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
  const [{ queueIndex, player, queue, activeCategory }, dispatch] =
    useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{queueIndex, player, queue, activeCategory, dispatch}}>
      {children}
    </AppContext.Provider>
  )
};

export const currentQueueItemMd5 = (queue: QueueItem[]): string | undefined => queue.length > 0 ? queue[0].md5 : undefined;
export const useAppContext = () => useContext(AppContext);
