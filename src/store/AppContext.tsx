import { createContext, useContext, useReducer, ReactNode } from 'react';
import { type MediaPlayerInstance, } from '@vidstack/react';
import { defaultQueue } from '@src/components/Player/defaultQueue';
import { getSecured, setSecured, getSecureAccessExpiresAt } from '@src/services/auth.service';
import type { QueueItem } from '@src/types/queueItem';
import type { Category } from '@src/types/Category';


type State = {
  player: MediaPlayerInstance | undefined,
  queueIndex: number,
  activeCategory: Category,
  secured: boolean,
  queue: QueueItem[],
  secureAccessExpiresAt: number
};


const initialState: State = {
  queueIndex: 0,
  queue: defaultQueue,
  activeCategory: null,
  secured: getSecured(),
  player: undefined,
  secureAccessExpiresAt: getSecureAccessExpiresAt()
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
  | { type: 'insertMultiQueueItems', queueItems: QueueItem[] }
  | { type: 'removeQueueItem', queueItem: QueueItem }
  | { type: 'clearAll' }
  | { type: 'setActiveCategory', activeCategory: Category }
  | { type: 'setSecureAccessExpiresAt', secureAccessExpiresAt: number }
  | { type: 'clearSecureExpiresAt' }
  | { type: 'setSecured' };

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
    case 'insertMultiQueueItems':
      return { ...state, queue: state.queue.splice(state.queueIndex + 1, 0, ...action.queueItems) };
    case 'removeQueueItem':
      return { ...state, queue: state.queue.filter((item) => item.md5 !== action.queueItem.md5) };
    case 'setActiveCategory':
      return { ...state, activeCategory: action.activeCategory };
    case 'clearAll':
      return { ...initialState };
    case 'setSecureAccessExpiresAt':
      return { ...state, secureAccessExpiresAt: action.secureAccessExpiresAt };
    case 'clearSecureExpiresAt':
      return { ...state, secureAccessExpiresAt: 0 };
    case 'setSecured':
      let secured:boolean = false;
      if (state.secureAccessExpiresAt > Date.now()) 
        secured = !state.secured
      else 
        secured = false;

      setSecured(secured);
      return { ...state, secured };
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
  const [{ queueIndex, secureAccessExpiresAt, secured, player, queue, activeCategory }, dispatch] =
    useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{queueIndex, secureAccessExpiresAt, secured, player, queue, activeCategory, dispatch}}>
      {children}
    </AppContext.Provider>
  )
};


export const currentQueueItemMd5 = (queue: QueueItem[]): string | undefined => queue.length > 0 ? queue[0].md5 : undefined;
export const useAppContext = () => useContext(AppContext);
