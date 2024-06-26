import urlJoin from 'url-join';

import { OPENAI_BASE_URL } from '@/core/const/api';
import { RecordMineType, getRecordMineType } from '@/core/utils/getRecordMineType';

export interface OpenAISTTPayload {
  options: {
    /**
     * @title The MIME type of the audio file.
     */
    mineType: RecordMineType;
    /**
     * @title The model to use for speech recognition.
     */
    model: string;
    /**
     * @title The prompt to use for speech recognition.
     */
    prompt?: string;
  };
  /**
   * @title
   */
  speech: Blob;
}

export interface OpenAISTTAPI {
  OPENAI_API_KEY?: string;
  OPENAI_PROXY_URL?: string;
  headers?: Headers;
  serviceUrl?: string;
}

const genSTTBody = ({ speech, options }: OpenAISTTPayload) => {
  const mineType = options?.mineType || getRecordMineType();
  const filename = `${Date.now()}.${mineType.extension}`;
  const file = new File([speech], filename, {
    type: mineType.mineType,
  });

  const body = new FormData();
  body.append('file', file);
  body.append('model', options?.model || 'whisper-1');

  return body;
};

const genServiceSTTBody = ({ speech, options }: OpenAISTTPayload) => {
  const mineType = options?.mineType || getRecordMineType();
  const filename = `${Date.now()}.${mineType.extension}`;

  const body = new FormData();
  body.append('options', JSON.stringify(options));
  body.append('speech', speech, filename);

  return body;
};

export class OpenaiSTT {
  private OPENAI_BASE_URL: string;
  private OPENAI_API_KEY: string | undefined;
  private serviceUrl: string | undefined;
  private headers?: Headers;
  constructor(api: OpenAISTTAPI = {}) {
    this.OPENAI_BASE_URL = api.OPENAI_PROXY_URL || OPENAI_BASE_URL;
    this.OPENAI_API_KEY = api.OPENAI_API_KEY;
    this.serviceUrl = api.serviceUrl;
    this.headers = api.headers;
  }

  static safeRecordMineType = getRecordMineType;

  fetch = async (payload: OpenAISTTPayload) => {
    const url = urlJoin(this.OPENAI_BASE_URL, 'audio/speech');
    return this.serviceUrl
      ? fetch(this.serviceUrl, {
          body: genServiceSTTBody(payload),
          headers: this.headers,
          method: 'POST',
        })
      : fetch(url, {
          body: genSTTBody(payload),
          headers: new Headers({
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
          }),
          method: 'POST',
        });
  };
  create = async (payload: OpenAISTTPayload): Promise<Response> => {
    const response = await this.fetch(payload);

    return response;
  };

  createText = async (payload: OpenAISTTPayload): Promise<string> => {
    const response = await this.fetch(payload);

    const json = await response.json();

    return json.text;
  };
}
