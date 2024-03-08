import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { QueueItem } from '../types/queueItem';
import {
  type MediaPlayerInstance,
} from '@vidstack/react';

type State = {
  queueItem: undefined | QueueItem,
  // player: undefined | MediaPlayerInstance,
  player: undefined | any;
}

const initialState: State = {
  queueItem: undefined,
  player: undefined
}

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setPlayerAction: (
      state,
      action: PayloadAction<any | undefined>
    ) => {
      state.player = action.payload
    }
  }
});

export const {
  setPlayerAction
} = mediaSlice.actions;

export default mediaSlice.reducer;