import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';

import { MicrosoftSpeechPayload, MicrosoftSpeechTTS } from '@/core';

// WebSocket
// import WebSocket from 'ws';
// global.WebSocket = WebSocket;

// EdgeSpeechTTS
const tts = new MicrosoftSpeechTTS({ locale: 'en-US' });

// Payload
const payload: MicrosoftSpeechPayload = {
  input: 'This is a speech demonstration',
  options: {
    style: 'embarrassed',
    voice: 'en-US-JacobNeural',
  },
};

const speechFile = path.resolve('./speech.mp3');

// create Microsoft Speech
async function main() {
  const response = await tts.create(payload);
  const mp3Buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(speechFile, mp3Buffer);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
