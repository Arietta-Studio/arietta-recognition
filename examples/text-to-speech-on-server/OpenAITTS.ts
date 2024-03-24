import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';

import { OpenAITTS, OpenAITTSPayload } from '@/core';

// OpenAITTS
const tts = new OpenAITTS({ OPENAI_API_KEY: 'your-api-key' });

// Payload
const payload: OpenAITTSPayload = {
  input: 'This is a speech demonstration',
  options: {
    model: 'tts-1',
    voice: 'alloy',
  },
};

const speechFile = path.resolve('./speech.mp3');

// create OpenAI TTS
async function main() {
  const response = await tts.create(payload);
  const mp3Buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(speechFile, mp3Buffer);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
