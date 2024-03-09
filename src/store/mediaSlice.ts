import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { QueueItem } from '../types/queueItem';
import {
  type MediaPlayerInstance,
} from '@vidstack/react';

type State = {
  queueItem: undefined | QueueItem,
  // player: undefined | MediaPlayerInstance,
  player: undefined | any;
  numbers: numnber[]
}

const initialState: State = {
  queueItem: undefined,
  player: undefined,
  numbers: [9196]
}

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<any | undefined>
    ) => {
      state.player = action.payload
    },
    addNum: (
      state,
      action: PayloadAction<number>
    ) => {
      state.numbers.push(action.payload)
    }
  }
});

export const {
  setPlayer, addNum
} = mediaSlice.actions;

export default mediaSlice.reducer;