import { createContext } from "react";

export const ProductContext = createContext({funcCanAdd: (state: boolean) => {}, howMany: 0, funcHowMany: (state: number) => {}});