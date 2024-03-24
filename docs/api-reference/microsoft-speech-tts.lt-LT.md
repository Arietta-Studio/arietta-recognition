---
group: TTS
title: MicrosoftSpeechTTS
apiHeader:
  pkg: '@arietta-studio/recognition'
---

`MicrosoftSpeechTTS` yra klasė tekstui versti į kalbą naudojant Microsoft kalbos paslaugas.

Ši klasė palaiko teksto konvertavimą į kalbą ir suteikia keletą metodų kalbos nustatymų gavimui ir kalbos sintezės užklausų kūrimui.

```ts
constructor(options: MicrosoftSpeechAPI): MicrosoftSpeechTTS
```

## Parametrai

- `options`: Objektas, neprivalomas.
  - `serviceUrl`: Eilutė, nurodo Microsoft kalbos paslaugų URL. Jei pateikiamas, užklausos bus siunčiamos į šį URL.
  - `locale`: Eilutė, nurodo naudojamą kalbos regioną. Jei pateikiamas, bus naudojamas norint filtruoti galimas balsus.

## Pavyzdžiai

```js
// index.js
// index.js
import { MicrosoftSpeechTTS } from '@arietta-studio/recognition';

// gauti MicrosoftSpeechTTS egzempliorių
const tts = new MicrosoftSpeechTTS({ locale: 'en-US' });

// sukurti duomenų paketą
const payload: MicrosoftSpeechPayload = {
  input: 'this is a message',
  options: {
    voice: 'en-US-JacobNeural',
    style: 'embarrassed',
  },
};

const speechFile = path.resolve('./speech.mp3');

// sukurti kalbą
const response = await tts.create(payload);
const mp3Buffer = Buffer.from(await response.arrayBuffer());

fs.writeFileSync(speechFile, mp3Buffer);
```

Paleisti naudojant Bun:

```shell
$ bun index.js
```

Paleisti Node.js aplinkoje:

Dėl `WebSocket` egzemplioriaus trūkumo Nodejs aplinkoje, reikia panaudoti WebSocket polifilą. Importuojant ws paketą.

```js
// importuoti failo viršuje
import WebSocket from 'ws';

global.WebSocket = WebSocket;
```

## Statinės Savybės

- `localeOptions`: Gauti visus palaikomus kalbos regionų nustatymus.
- `voiceList`: Visų galimų balsų sąrašas.
- `voiceName`: Objektas, turintis visus balsų pavadinimus.
- `styleList`: Visų galimų balsų stilių sąrašas.
- `createRequest`: Statinis metodas kalbos sintezės užklausoms kurti.

## Metodai

### `voiceOptions`

Gauti dabartinio egzemplioriaus balsų nustatymus, remiantis per sukūrimą nurodytu `locale`. Grąžina objektą, turintį galimus balsų nustatymus.

### `create(payload: MicrosoftSpeechPayload): Promise<Response>`

Sukurti kalbos sintezę naudojant pateiktą užklausos duomenų paketą.

#### Parametrai

- `payload`: `MicrosoftSpeechPayload` tipo, turintis būtiną informaciją kalbos sintezės užklausai.

#### Grąžinimo Reikšmė

Grąžina `Promise`, kuris išsprendžiamas į `Response` objektą, turintį sintezuotos kalbos duomenis.

### `createAudio(payload: MicrosoftSpeechPayload): Promise<AudioBuffer>`

Sukurti kalbos sintezę naudojant pateiktą užklausos duomenų paketą ir konvertuoti ją į `AudioBuffer` objektą.

#### Parametrai

- `payload`: `MicrosoftSpeechPayload` tipo, turintis būtiną informaciją kalbos sintezės užklausai.

#### Grąžinimo Reikšmė

Grąžina `Promise`, kuris išsprendžiamas į `AudioBuffer` objektą, turintį sintezuotus garso duomenis.
