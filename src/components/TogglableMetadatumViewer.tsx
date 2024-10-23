import React from 'react';
import { useState } from 'react';

export type TogglableMetadatumViewerProps = {
  text: string;
};


export function TogglableMetadatumViewer({ text }: TogglableMetadatumViewerProps): React.JSX.Element {
  const [fullyVisible, setFullyVisible] = useState<boolean>(false);

  return (    
    <div onClick={() => setFullyVisible(!fullyVisible)} className={`toggable-viewer cursor-pointer ${fullyVisible ? "" : "truncate"}`}>
      {text} {fullyVisible == false ? "[e]" : "[click to expand]"}
    </div>
  );
}