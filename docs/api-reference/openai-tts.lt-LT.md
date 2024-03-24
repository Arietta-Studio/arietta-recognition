---
group: TTS
title: OpenAITTS
apiHeader:
  pkg: '@arietta-studio/recognition'
---

`OpenAITTS` yra klasė tekstui versti į kalbą naudojant OpenAI balso paslaugą.

Ši klasė palaiko teksto konvertavimą į kalbą ir suteikia metodų rinkinį gauti balso parinktis ir kurti kalbos sintezės užklausas.

```ts
constructor(options: OpenAITTSAPI): OpenAITTS
```

## Parametrai

- `options`: Objektas, neprivalomas.
  - `OPENAI_PROXY_URL`: Eilutė, nurodo OpenAI tarpinio serverio URL. Jei pateikiamas, užklausos bus siunčiamos į šį URL.
  - `OPENAI_API_KEY`: Eilutė, nurodo OpenAI API raktą. Jei pateikiamas, bus naudojamas autentifikacijai.
  - `serviceUrl`: Eilutė, nurodo naudojamos OpenAI balso paslaugos URL. Jei pateikiamas, bus naudojamas siųsti užklausas.

## Pavyzdžiai

```js
// index.js
import { OpenAITTS } from '@arietta-studio/recognition';
import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';

// Sukurti OpenAITTS egzempliorių
const tts = new OpenAITTS({ OPENAI_API_KEY: 'jūsų-api-raktas' });

// Sukurti kalbos sintezės užklausos duomenų paketą
const payload = {
  input: 'Tai yra balso sintezės demonstracija',
  options: {
    model: 'tts-1',
    voice: 'alloy',
  },
};

const speechFile = path.resolve('./speech.mp3');

// Iškviesti create metodą sintezuoti kalbą
const response = await tts.create(payload);
const mp3Buffer = Buffer.from(await response.arrayBuffer());

fs.writeFileSync(speechFile, mp3Buffer);
```

Paleisti naudojant Bun:

```shell
$ bun index.js
```

Node.js aplinkoje:

```js
// Importuoti failo viršuje
import WebSocket from 'ws';

global.WebSocket = WebSocket;
```

## Statinės Savybės

- `voiceList`: Visų galimų balsų sąrašas.

## Metodai

### `voiceOptions`

Gauti dabartinio egzemplioriaus balso parinktis remiantis per instancijos sukūrimą nurodytu `serviceUrl`. Grąžina objektą, kuriame yra prieinamos balso parinktys.

### `createAudio(payload: OpenAITTSPayload): Promise<AudioBuffer>`

Sukurti kalbos sintezę naudojant pateiktą užklausos duomenų paketą.

#### Parametrai

- `payload`: `OpenAITTSPayload` tipas, apima būtiną informaciją kalbos sintezės užklausai.

#### Grąžinimas

Grąžina `Promise`, kuris išsprendžiamas į `AudioBuffer` objektą, kuriame yra sintezuoti garso duomenys.
