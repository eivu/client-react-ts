import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Tooltip,
  useMediaState,
  type TooltipPlacement,
} from '@vidstack/react';
import {
  ClosedCaptionsIcon,
  ClosedCaptionsOnIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  MuteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PictureInPictureExitIcon,
  PictureInPictureIcon,
  PlayIcon,
  SeekBackward10Icon,
  SeekForward10Icon,
  SeekBackward30Icon,
  SeekForward30Icon,
  VolumeHighIcon,
  VolumeLowIcon,
} from '@vidstack/react/icons';

import { useAppContext } from '@src/store/AppContext';

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
}

export function Play({ tooltipPlacement }: MediaButtonProps) {
  const isPaused = useMediaState('paused');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className="vds-button">{isPaused ? <PlayIcon /> : <PauseIcon className='text-white' />}</PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isPaused ? 'Play' : 'Pause'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState('volume'),
    isMuted = useMediaState('muted');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className="vds-button">
          {isMuted || volume == 0 ? (
            <MuteIcon />
          ) : volume < 0.5 ? (
            <VolumeLowIcon />
          ) : (
            <VolumeHighIcon />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isMuted ? 'Unmute' : 'Mute'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Caption({ tooltipPlacement }: MediaButtonProps) {
  const track = useMediaState('textTrack'),
    isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className="vds-button">
          {isOn ? <ClosedCaptionsOnIcon /> : <ClosedCaptionsIcon />}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Prev({ tooltipPlacement }: MediaButtonProps) {
  const { dispatch, player } = useAppContext();

  const handleOnClick = () => {
    if (player!.current.currentTime <= 3)
      dispatch({type: 'decrementQueueIndex'})
    else
      player!.current.currentTime = 0;
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ChevronLeftIcon className="cursor-pointer" size={32} onClick={handleOnClick}/>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        Previous Track
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Next({ tooltipPlacement }: MediaButtonProps) {
  const { dispatch, player, queue, queueIndex } = useAppContext();
  const handleOnClick = () => {
    if (queueIndex == queue.length - 1)
      player!.current.currentTime = 999999999;
    else
      dispatch({type: 'incrementQueueIndex'})
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ChevronRightIcon className="cursor-pointer" size={32} onClick={handleOnClick}/>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        Next Track
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('pictureInPicture');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton className="vds-button">
          {isActive ? <PictureInPictureExitIcon /> : <PictureInPictureIcon />}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isActive ? 'Exit PIP' : 'Enter PIP'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('fullscreen');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className="vds-button">
          {isActive ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export interface SeekButtonProps extends MediaButtonProps {
  seconds: number;
}


export function Seek({ seconds, tooltipPlacement }: SeekButtonProps) {
  const isBackward = seconds < 0;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className="vds-button" seconds={seconds}>
          {isBackward ? <SeekBackward10Icon /> : <SeekForward10Icon />}
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isBackward ? 'Seek Backward' : 'Seek Forward'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Seek30({ seconds, tooltipPlacement }: SeekButtonProps) {
  const isBackward = seconds < 0;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className="vds-button" seconds={seconds}>
          {isBackward ? <SeekBackward30Icon /> : <SeekForward30Icon />}
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isBackward ? 'Seek Backward' : 'Seek Forward'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}