import { useSpeechRecognition } from '@arietta-studio/recognition/react';
import { Icon, StoryBook, useControls, useCreateStore } from '@arietta-studio/ui';
import { Button, Input } from 'antd';
import { Mic, StopCircle } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const store = useCreateStore();
  const { locale }: any = useControls(
    {
      locale: 'en-US',
    },
    { store },
  );

  const { text, start, stop, isLoading, formattedTime, url } = useSpeechRecognition(locale, {
    autoStop: true,
  });
  return (
    <StoryBook levaStore={store}>
      <Flexbox gap={8}>
        {isLoading ? (
          <Button block icon={<Icon icon={StopCircle} />} onClick={stop}>
            Stop {formattedTime}
          </Button>
        ) : (
          <Button block icon={<Icon icon={Mic} />} onClick={start} type={'primary'}>
            Recognition
          </Button>
        )}
        <Input.TextArea placeholder={'Recognition result...'} value={text} />
        {url && <audio controls src={url} />}
      </Flexbox>
    </StoryBook>
  );
};
