import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';

import { EdgeSpeechPayload, EdgeSpeechTTS } from '@/core';

// WebSocket
// import WebSocket from 'ws';
// global.WebSocket = WebSocket;

// EdgeSpeechTTS
const tts = new EdgeSpeechTTS({ locale: 'en-US' });

// Payload
const payload: EdgeSpeechPayload = {
  input: 'This is a speech demonstration',
  options: {
    voice: 'en-US-GuyNeural',
  },
};

const speechFile = path.resolve('./speech.mp3');

// Main
async function main() {
  const response = await tts.create(payload);
  const mp3Buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(speechFile, mp3Buffer);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
