import { createContext, useContext, useReducer, ReactNode } from 'react';
import { type MediaPlayerInstance, } from '@vidstack/react';
import { defaultQueue } from '../components/Player/defaultQueue';

type State = {
  player: MediaPlayerInstance | undefined,
  queueItem: QueueItem | undefined,
  queue: QueueItem[],
  numbers: number[]
};


const initialState: State = {
  queueItem: defaultQueue[0],
  queue: defaultQueue,
  player: undefined,
  numbers: [9196]
}

type Action =
  | { type: 'addNumber', number: number }
  | { type: 'setPlayer', player: MediaPlayerInstance }
  | { type: 'setQueueItem', queueItem: QueueItem }
  | { type: 'setQueue', queue: QueueItem[] }
  | { type: 'clearQueue' }
  | { type: 'clearQueueItem' }
  | { type: 'addQueueItem', queueItem: QueueItem }
  | { type: 'removeQueueItem', queueItem: QueueItem }
  | { type: 'clearAll' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addNumber': 
      return { ...state, numbers: [...state.numbers, action.number]}
    case 'setPlayer':
      return { ...state, player: action.player };
    case 'setQueueItem':
      return { ...state, queueItem: action.queueItem };
    case 'setQueue':
      return { ...state, queue: action.queue };
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
  const [{ player, queueItem, queue, numbers }, dispatch] =
    useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{player, queueItem, queue, numbers, dispatch}}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => useContext(AppContext);