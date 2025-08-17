/*
MIT License

Copyright (c) 2024 Michal Koczkodon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
import { TPlayerState, TPlayerStateCode } from './type';

export default class YouTubeIFrameCtrl {
  private errors = [
    'Element not found',
    'Element is not an iframe',
    'Youtube url does not include query parameter - enablejsapi=1 - JS API is disabled',
  ];

  private playerStates = {
    [-2]: 'NOT_READY',
    [-1]: 'UNSTARTED',
    [0]: 'ENDED',
    [1]: 'PLAYING',
    [2]: 'PAUSED',
    [3]: 'BUFFERING',
    [5]: 'CUED',
  } satisfies Record<TPlayerStateCode, TPlayerState>;

  public currentPlayerStateCode: TPlayerStateCode = -2;

  private iframe: HTMLIFrameElement;
  private loaded: Promise<boolean>;
  private messageListener: ((event: MessageEvent) => void) | null = null;

  constructor(iframe: HTMLIFrameElement | string) {
    let element: HTMLElement | null = null;

    if (typeof iframe === 'string') {
      element = document.querySelector(iframe);

      if (element === null) {
        this.throwError(0, iframe);
      }
    } else {
      element = iframe;
    }

    if (element instanceof HTMLIFrameElement) {
      this.iframe = element;
    } else {
      this.throwError(1);
    }

    if (!this.iframe.src.includes('enablejsapi=1')) {
      this.throwError(2, this.iframe.src);
    }

    this.loaded = new Promise((resolve) => {
      let loaded = false;

      const loadListener = () => {
        this.iframe.removeEventListener('load', loadListener);

        setTimeout(() => {
          this.iframe.contentWindow?.postMessage('{"event":"listening"}', '*');
        });
      };

      this.iframe.addEventListener('load', loadListener);

      this.messageListener = (event: MessageEvent) => {
        if (event.source === this.iframe.contentWindow && event.data) {
          let eventData: any;

          try {
            eventData = JSON.parse(event.data);
          } catch {
            return;
          }

          if (eventData.event === 'onReady' && !loaded) {
            loaded = true;
            this.iframe.removeEventListener('load', loadListener);
            resolve(true);
          }

          if (typeof eventData.info?.playerState === 'number') {
            this.stateChangeHandler(eventData.info.playerState);
          }

          this.messageHandler(eventData);
        }
      };

      window.addEventListener('message', this.messageListener);
      this.iframe.contentWindow?.postMessage('{"event":"listening"}', '*');
    });
  }

  private throwError(errorCode: number, optionalMessage?: string): never {
    throw new Error(this.errors[errorCode] + (optionalMessage ? `: ${optionalMessage}` : '.'));
  }

  private stateChangeHandler(playerStateCode: TPlayerStateCode): void {
    this.currentPlayerStateCode = playerStateCode;
    const event = new CustomEvent('ytstatechange', {
      detail: this.playerStates[this.currentPlayerStateCode],
    });
    this.iframe.dispatchEvent(event);
  }

  private messageHandler(data: any): void {
    const event = new CustomEvent('ytmessage', { detail: data });
    this.iframe.dispatchEvent(event);
  }

  async command(command: string, args?: any[]) {
    await this.loaded;

    this.iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: command,
        args: args || [],
      }),
      '*',
    );
  }

  async play() {
    return this.command('playVideo');
  }

  async pause() {
    return this.command('pauseVideo');
  }

  async stop() {
    return this.command('stopVideo');
  }

  async mute() {
    return this.command('mute');
  }

  async unMute() {
    return this.command('unMute');
  }

  async setVolume(volume: number) {
    await this.unMute();
    await this.command('setVolume', [volume]);
  }

  get playerState() {
    return this.playerStates[this.currentPlayerStateCode];
  }
}
