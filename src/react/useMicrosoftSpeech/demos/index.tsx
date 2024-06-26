import { MicrosoftSpeechTTS } from '@arietta-studio/recognition';
import { AudioPlayer, useMicrosoftSpeech } from '@arietta-studio/recognition/react';
import { Icon, StoryBook, useControls, useCreateStore } from '@arietta-studio/ui';
import { Button, Input } from 'antd';
import { Volume2 } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

import { MICROSOFT_SPEECH_BACKEND_URL } from '../../_util/api';
import { genLevaOptions } from '../../_util/leva';

const defaultText = 'Hello, World!';

export default () => {
  const store = useCreateStore();
  const api: any = useControls(
    {
      serviceUrl: MICROSOFT_SPEECH_BACKEND_URL,
    },
    { store },
  );
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
      style: {
        options: MicrosoftSpeechTTS.styleList,
        value: 'general',
      },
      voice: {
        options: genLevaOptions(new MicrosoftSpeechTTS().voiceOptions),
        value: 'en-US-GuyNeural',
      },
    },
    { store },
  );
  const { setText, isGlobalLoading, audio, start, stop } = useMicrosoftSpeech(defaultText, {
    api,
    options,
  });
  return (
    <StoryBook levaStore={store}>
      <Flexbox gap={8}>
        {isGlobalLoading ? (
          <Button block loading onClick={stop}>
            Generating...
          </Button>
        ) : (
          <Button block icon={<Icon icon={Volume2} />} onClick={start} type={'primary'}>
            Speak
          </Button>
        )}
        <Input.TextArea defaultValue={defaultText} onChange={(e) => setText(e.target.value)} />
        <AudioPlayer audio={audio} isLoading={isGlobalLoading} onLoadingStop={stop} />
      </Flexbox>
    </StoryBook>
  );
};
