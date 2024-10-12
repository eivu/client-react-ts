import React from 'react';
import { useState } from 'react';

export type TogglableViewerProps = {
  children: React.JSX.Element;
};


export function TogglableViewer({ children }: TogglableViewerProps): React.JSX.Element {
  const [fullyVisible, setFullyVisible] = useState<boolean>(false);

  return (    
    <div onClick={() => setFullyVisible(!fullyVisible)} className={`toggable-viewer cursor-pointer ${fullyVisible ? "" : "truncate"}`}>
      {children}
    </div>
  );
}