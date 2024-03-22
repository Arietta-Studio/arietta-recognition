import { Snippet } from '@arietta-studio/ui';
import { Center } from 'react-layout-kit';

export default () => {
  return (
    <Center style={{ marginTop: -88 }}>
      <h2 style={{ fontSize: 20 }}>To install Arietta Recognition, run the following command:</h2>
      <Snippet language={'bash'}>{'$ bun add @arietta-studio/recognition'}</Snippet>
    </Center>
  );
};
