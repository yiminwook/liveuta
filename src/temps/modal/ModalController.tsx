import React from 'react';
import { v1 as uuid } from 'uuid';

export type ModalBaseProps = {
  onSuccess: (value: any) => void;
  onClose: () => void;
};

export type ModalProps<T> = T & ModalBaseProps;

export type ModalInfo<T = Record<string, unknown>> = {
  /** 유니크한 값, id */
  key: string;
  Component: React.FC<ModalProps<T>>;
  props: ModalProps<T>;
};

export default class ModalController {
  private modalInfos: ModalInfo<any>[] = [];

  constructor(private renderState: [number, React.Dispatch<React.SetStateAction<number>>]) {
    this.pop = this.pop.bind(this);
    this.clear = this.clear.bind(this);
  }

  private reRender() {
    const [_, setState] = this.renderState;
    // state가 1000을 넘어갈경우 1로 초기화
    setState((pre) => (pre + 1 > 1000 ? 1 : pre + 1));
  }

  private checkKey(key: string) {
    const isNotDuplicated = this.modalInfos.every((info) => info.key !== key);
    if (!isNotDuplicated) console.warn(`duplicated modal key: ${key}`);
    return isNotDuplicated;
  }

  private handlePromise(
    key: ModalInfo['key'],
    resolver: (value: any | PromiseLike<any>) => void,
    value: any,
  ) {
    this.modalInfos = this.modalInfos.filter((info) => {
      // 성공 또는 닫힐때 key에 해당하는 모달을 찾아서 제거한다.
      return info.key !== key;
    });
    resolver(value);
    this.reRender();
  }

  get top() {
    return this.modalInfos.at(-1);
  }

  get length() {
    return this.modalInfos.length;
  }

  get all() {
    return this.modalInfos;
  }

  /**
   * 모달 하나를 스토어에 담을때
   *
   * T: props의 타입
   * U: resolve의 타입
   *
   */
  async push<T, U = unknown>(
    Component: React.FC<ModalProps<T>>,
    options?: {
      props?: T;
      /** 아이디를 명시하지 않을경우 랜덤으로 부여 */
      id?: string;
    },
  ): Promise<U> {
    const key = options?.id || uuid();
    return new Promise<U>((resolve) => {
      if (!this.checkKey(key)) return resolve(undefined as U);
      // key가 중복되지 않을경우만 모달을 추가한다.
      this.modalInfos.push({
        key,
        Component,
        props: {
          ...options?.props,
          onSuccess: (value: U) => this.handlePromise(key, resolve, value),
          onClose: () => this.handlePromise(key, resolve, undefined),
        },
      });
      this.reRender();
    });
  }

  /** 맨위 모달을 하나 닫는 메서드 */
  pop() {
    if (this.top) {
      const info = this.top;
      info.props.onClose();
      return info;
    }
  }

  /** 모달을 전부 닫는 메서드 */
  clear() {
    while (this.top) {
      this.pop();
    }
  }
}
