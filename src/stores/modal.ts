import { v1 as uuid } from 'uuid';
import { create } from 'zustand';

export type ModalBaseProps = {
  onSuccess: (value: any) => void;
  onClose: () => void;
};

export type ModalProps<T = object> = T & ModalBaseProps;

export type TModal<T = object> = {
  /** 유니크한 값, id */
  key: string;
  Component: React.FC<ModalProps<T>>;
  props: ModalProps<T>;
};

const initState = {
  modals: [] as TModal<any>[],
};

type Actions = {
  _private: {
    top: () => TModal | undefined;
    checkKey: (key: string) => boolean;
    handlePromise: (
      key: TModal['key'],
      resolver: (value: any | PromiseLike<any>) => void,
      value: any,
    ) => Promise<void>;
  };
  actions: {
    push: <T, U = unknown>(
      Component: React.FC<ModalProps<T>>,
      options?: {
        /** 아이디를 명시하지 않을경우 랜덤으로 부여 */
        id?: string;
        props?: T;
      },
    ) => Promise<U>;
    pop: () => TModal | undefined;
    closeAll: () => void;
  };
};

export const useModalStore = create<typeof initState & Actions>((set, get) => ({
  ...initState,
  _private: {
    top: () => get().modals.at(-1),
    checkKey: (key) => {
      const isNotDuplicated = get().modals.every((info) => info.key !== key);
      if (!isNotDuplicated) console.warn(`duplicated modal key: ${key}`);
      return isNotDuplicated;
    },
    async handlePromise(key, resolver, value) {
      set(({ modals: modalInfos }) => {
        resolver(value);
        return {
          modals: modalInfos.filter((info) => {
            // 성공 또는 닫힐때 key에 해당하는 모달을 찾아서 제거한다.
            return info.key !== key;
          }),
        };
      });
    },
  },
  actions: {
    push: async (Component, options) => {
      const key = options?.id || uuid();
      return new Promise((resolve) => {
        if (!get()._private.checkKey(key)) return resolve(undefined as any);
        // key가 중복되지 않을경우만 모달을 추가한다.
        set(({ modals: modalInfos }) => ({
          modals: modalInfos.concat({
            key,
            Component,
            props: {
              ...options?.props,
              onSuccess: (value: any) => get()._private.handlePromise(key, resolve, value),
              onClose: () => get()._private.handlePromise(key, resolve, undefined),
            },
          }),
        }));
      });
    },
    pop: () => {
      const top = get()._private.top();
      if (top) {
        top.props.onClose();
        return top;
      }
    },
    closeAll: () => {
      while (get()._private.top()) {
        get().actions.pop();
      }
    },
  },
}));

export const useSetModalStore = () => useModalStore((state) => state.actions);
