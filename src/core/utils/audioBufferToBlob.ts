const audioBufferToWav = async (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferOut = new ArrayBuffer(length);
  const view = new DataView(bufferOut);
  const channels = [];
  let sample;
  let offset = 0;
  let pos = 0;

  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };

  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // WAV
  setUint32(0x46_46_49_52); // "RIFF"
  setUint32(length - 8);
  setUint32(0x45_56_41_57); // "WAVE"

  //  fmt
  // prettier-ignore
  setUint32(0x20_74_6D_66); // "fmt "
  setUint32(16);
  setUint16(1);
  setUint16(numOfChan);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * numOfChan);
  setUint16(numOfChan * 2);
  setUint16(16);

  //  data
  setUint32(0x61_74_61_64); // "data"
  setUint32(length - pos - 4);

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
      sample = Math.trunc(0.5 + sample < 0 ? sample * 32_768 : sample * 32_767); // scale
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return bufferOut;
};
export const audioBufferToBlob = async (audioBuffer: AudioBuffer) => {
  const wavArrayBuffer = await audioBufferToWav(audioBuffer);
  return new Blob([wavArrayBuffer], { type: 'audio/wav' });
};

export const mergeAudioBuffers = async (audioBuffers: AudioBuffer[]): Promise<AudioBuffer> => {
  const audioContext = new AudioContext();
  const totalLength = audioBuffers.reduce((acc, curr) => acc + curr.length, 0);

  // outputBuffer
  const outputBuffer = audioContext.createBuffer(
    audioBuffers[0].numberOfChannels,
    totalLength,
    audioBuffers[0].sampleRate,
  );

  let offset = 0;

  audioBuffers.forEach((buffer) => {
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const inputData = buffer.getChannelData(i);
      const outputData = outputBuffer.getChannelData(i);
      outputData.set(inputData, offset);
    }
    offset += buffer.length;
  });

  return outputBuffer;
};
