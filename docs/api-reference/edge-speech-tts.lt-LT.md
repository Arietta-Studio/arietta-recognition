---
group: TTS
title: EdgeSpeechTTS
apiHeader:
  pkg: '@arietta-studio/recognition'
---

`EdgeSpeechTTS` yra klasė skirta teksto keitimui į kalbą, remiantis Edge kalbos paslauga.

Ši klasė palaiko teksto keitimą į kalbą ir suteikia metodų rinkinį, skirtą gauti balsų parinktis ir kurti kalbos sintezės užklausas.

```ts
constructor(options: EdgeSpeechAPI): EdgeSpeechTTS
```

## Parametrai

- `options`: Objektas, neprivalomas.
  - `serviceUrl`: Eilutė, nurodanti Edge kalbos paslaugos URL. Jei pateikiamas, užklausos bus siunčiamos į šį URL.
  - `locale`: Eilutė, nurodanti naudojamą balsų lokalę. Jei pateikiamas, bus naudojamas norint filtruoti galimų balsų sąrašą.

## Pavyzdžiai

```js
// index.js
import { EdgeSpeechTTS } from '@arietta-studio/recognition';
import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';

// Sukurti EdgeSpeechTTS egzempliorių
const tts = new EdgeSpeechTTS({ locale: 'en-US' });

// Sukurti kalbos sintezės užklausos duomenis
const payload = {
  input: 'This is a speech demonstration',
  options: {
    voice: 'en-US-GuyNeural',
  },
};

const speechFile = path.resolve('./speech.mp3');

// Iškviesti create metodą kalbos sintezei atlikti
const response = await tts.create(payload);
const mp3Buffer = Buffer.from(await response.arrayBuffer());

fs.writeFileSync(speechFile, mp3Buffer);
```

Paleisti naudojant Bun:

```shell
$ bun index.js
```

Paleisti Node.js aplinkoje:

Kadangi Node.js aplinkoje trūksta `WebSocket` egzemplioriaus, reikia jį polifiliuoti. Tai galima padaryti importuojant ws paketą.

```js
// Importuoti failo viršuje
import WebSocket from 'ws';

global.WebSocket = WebSocket;
```

## Statinės Savybės

- `localeOptions`: Gauti visus palaikomus balsų lokalės parinktis.
- `voiceList`: Visų galimų balsų sąrašas.
- `voiceName`: Objektas, turintis visus balsų pavadinimus.
- `createRequest`: Statinis metodas, naudojamas kalbos sintezės užklausoms kurti.

## Metodai

### `voiceOptions`

Gauti dabartinio egzemplioriaus balsų parinktis, remiantis per instanciją nurodyta `locale`. Grąžina objektą, turintį šiuo metu galimas balsų parinktis.

### `createAudio(payload: EdgeSpeechPayload): Promise<AudioBuffer>`

Sukurti kalbos sintezę naudojant pateiktą užklausos duomenis.

#### Parametrai

- `payload`: `EdgeSpeechPayload` tipo, turintis būtiną informaciją kalbos sintezės užklausai.

#### Grąžinamoji Vertė

Grąžina `Promise`, kuris išsprendžiamas į `AudioBuffer` objektą, turintį sintezuoto garso duomenis.
