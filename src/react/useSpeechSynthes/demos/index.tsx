import { SpeechSynthesisTTS } from '@arietta-studio/recognition';
import { useSpeechSynthes } from '@arietta-studio/recognition/react';
import { Icon, StoryBook, useControls, useCreateStore } from '@arietta-studio/ui';
import { Button, Input } from 'antd';
import { StopCircle, Volume2 } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

import { genLevaOptions } from '../../_util/leva';

const defaultText = 'Hello, World!';

export default () => {
  const store = useCreateStore();
  const options: any = useControls(
    {
      pitch: {
        max: 1,
        min: -1,
        step: 0.1,
        value: 0,
      },
      rate: {
        max: 1,
        min: -1,
        step: 0.1,
        value: 0,
      },
      voice: {
        options: genLevaOptions(new SpeechSynthesisTTS().voiceOptions),
        value: 'Samantha',
      },
    },
    { store },
  );
  const { setText, isLoading, start, stop } = useSpeechSynthes(defaultText, options);
  return (
    <StoryBook levaStore={store}>
      <Flexbox gap={8}>
        {isLoading ? (
          <Button block icon={<Icon icon={StopCircle} />} onClick={stop}>
            Stop
          </Button>
        ) : (
          <Button block icon={<Icon icon={Volume2} />} onClick={start} type={'primary'}>
            Speak
          </Button>
        )}
        <Input.TextArea defaultValue={defaultText} onChange={(e) => setText(e.target.value)} />
      </Flexbox>
    </StoryBook>
  );
};
