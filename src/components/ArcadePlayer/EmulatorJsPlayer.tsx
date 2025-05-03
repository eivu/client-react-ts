import React from 'react';
import { type ViewerProps } from '@src/components/ContentViewer';
import { ROM_FORMATS } from './index';
import { ES_CONTROLLER_MAPPINGS } from './ejs_controller_mappings';

export const EmulatorJsPlayer: React.FC<ViewerProps> = ({ file }) => {
  const core = ROM_FORMATS[file.contentType].core || 'unknown';
  const controllerMapping = ES_CONTROLLER_MAPPINGS["Google Stadia"];
  const gameMapping = controllerMapping[core] || controllerMapping.unknown;
  return <iframe id="emulatorjs" src={`/emulatorjs.html?name=${file.name}&md5=${file.md5}&rom=${file.url}&mapping=${JSON.stringify(gameMapping)}&core=${core}`}></iframe>;
};
