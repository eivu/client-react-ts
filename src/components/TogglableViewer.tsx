import React from 'react';
import { useState } from 'react';

export type TogglableViewerProps = {
  text: string;
};


export function TogglableViewer({ text }: TogglableViewerProps): React.JSX.Element {
  const [fullyVisible, setFullyVisible] = useState<boolean>(false);

  return (    
    <div onClick={() => setFullyVisible(!fullyVisible)} className={`toggable-viewer cursor-pointer ${fullyVisible ? "" : "truncate"}`}>
      {text} {fullyVisible == false ? "[e]" : "[click to expand]"}
    </div>
  );
}