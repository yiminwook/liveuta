import { atom } from "recoil";
import { v1 } from "uuid";

export const isLoadingAtom = atom({
  key: `loadingAtom${v1()}`,
  default: false,
});
