import styles from './audio-layout.module.css';

import { Captions, Title, Controls } from '@vidstack/react';

import * as Buttons from './shared/buttons';
import * as Sliders from './shared/sliders';
import { TimeGroup } from './shared/time-group';

export function AudioLayout() {
  return (
    <>
      <Captions className={`${styles.captions} vds-captions`} />
      <Controls.Root className={`${styles.controls} vds-controls`}>
        <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
          <Sliders.Time />
        </Controls.Group>
        <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
          <Buttons.Prev tooltipPlacement="top start" />
          {/* <Buttons.Seek seconds={-10} tooltipPlacement="top start" /> */}
          <Buttons.Play tooltipPlacement="top" />
          {/* <Buttons.Seek seconds={10} tooltipPlacement="top" /> */}
          <Buttons.Next tooltipPlacement="top" />
          <TimeGroup />
          <Title className="vds-chapter-title" />
          <Buttons.Mute tooltipPlacement="top" />
          <Sliders.Volume />
          <Buttons.Caption tooltipPlacement="top" />
          {/* <Menus.Settings placement="top end" tooltipPlacement="top end" /> */}
        </Controls.Group>
      </Controls.Root>
    </>
  );
}
