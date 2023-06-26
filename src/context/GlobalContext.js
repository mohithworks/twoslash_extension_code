import { createContext, useContext } from "react";

export const MyGlobalContext = createContext({
  user: null,
  setUser: () => {},
  userDet: null,
  setUserDet: () => {},
  back: false,
  setBack: () => {},
  status: '',
  setStatus: () => {},
  apikeyT: null,
  setapiKeyT: () => {},
  modelT: "gpt-3.5-turbo-030",
  setModelT: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);