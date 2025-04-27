import React from 'react';
import { useAppContext } from '@src/store/AppContext';
import type { FC } from 'react';

export const ErrorPanel: FC<{errorMessage: string}> = ({errorMessage}) => {
  return (
    <div className="flex items-center justify-center text-2xl py-10">
      {errorMessage}
    </div>
  );
} 
