import { createContext, ReactNode, useContext } from "react";
import { StaticImageData } from "next/image";
import TitleImage from "../assets/PAVAnh_Prewedding_C1_4V0A9188.jpg";

export type Config = {
  weddingDate: Date;
  location: string;
  groom: Person;
  bride: Person;
  titleImage: StaticImageData;
};

export type Person = {
  name: string;
  father?: Person;
  mother?: Person;
};

export const MyConfig: Config = {
  weddingDate: new Date(2022, 0, 8),
  location: "Nikko Hotel Saigon",
  groom: {
    name: "Việt Anh",
    mother: {
      name: "Kim Ngân",
    },
  },
  bride: {
    name: "Phương Anh",
    mother: {
      name: "Vũ Thị Hương",
    },
    father: {
      name: "Bùi Văn Minh",
    },
  },
  titleImage: TitleImage,
};

const ConfigContext = createContext({} as Config);
export const useConfig = () => useContext(ConfigContext);

type Props = {
  children: ReactNode;
};
export const ConfigWrapper = ({ children }: Props) => {
  return (
    <ConfigContext.Provider value={MyConfig}>{children}</ConfigContext.Provider>
  );
};
