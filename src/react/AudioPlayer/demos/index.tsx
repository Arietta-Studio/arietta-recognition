import { AudioPlayer, useAudioPlayer } from '@arietta-studio/recognition/react';
import { StoryBook, useControls, useCreateStore } from '@arietta-studio/ui';

export default () => {
  const store = useCreateStore();

  const { url, ...options }: any = useControls(
    {
      allowPause: false,
      showSlider: true,
      timeRender: {
        options: ['text', 'tag'],
        value: 'text',
      },
      timeType: {
        options: ['left', 'current', 'combine'],
        value: 'left',
      },
      url: 'https://gw.alipayobjects.com/os/kitchen/lnOJK2yZ0K/sound.mp3',
    },
    { store },
  );

  const { isLoading, ...audio } = useAudioPlayer({ src: url });

  return (
    <StoryBook levaStore={store}>
      <AudioPlayer audio={audio} autoplay isLoading={isLoading} {...options} />
    </StoryBook>
  );
};
