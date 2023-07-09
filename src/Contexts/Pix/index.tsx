import { createContext, useContext, useMemo } from "react";
import { Api } from "../../api";

interface PixContextProps {
  generatePix: (callback?: (data?: any) => void) => void;
}

const PixContext = createContext({} as PixContextProps);
export const PixProvider = ({ children }: any) => {
  const generatePix = async (callback: (data?: any) => void = () => {}) => {
    const { data } = await Api.get("/pix");
    if (data) {
      callback && callback(data);
    }
  };

  const value = useMemo(() => {
    return {
      generatePix,
    };
  }, [generatePix]);

  return <PixContext.Provider value={value}>{children}</PixContext.Provider>;
};
export const usePix = () => {
  const context = useContext(PixContext);
  return context;
};
