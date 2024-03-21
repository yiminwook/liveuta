import { createContext } from "react";
import ModalController from "./ModalController";

const ModalContext = createContext<ModalController | null>(null);

export default ModalContext;
