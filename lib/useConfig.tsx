import { createContext, ReactNode, useContext } from "react";
import { StaticImageData } from "next/image";
import TitleImage from "../assets/PAVAnh_Prewedding_C1_4V0A9188.jpg";
import Image1 from "../assets/PAVAnh_Prewedding_C1_4V0A9076-L.jpg";
import Image2 from "../assets/PAVAnh_Prewedding_C1_4V0A9117-L.jpg";
import Image3 from "../assets/PAVAnh_Prewedding_C1_4V0A9107.jpg";
import Image4 from "../assets/PAVAnh_Prewedding_C1_4V0A9128.jpg";
import Image5 from "../assets/PAVAnh_Prewedding_C1_4V0A9332-L.jpg";
import Image6 from "../assets/PAVAnh_Prewedding_C1_4V0A9021.jpg";
import Image7 from "../assets/PAVAnh_Prewedding_C1_4V0A9472.jpg";
import Image8 from "../assets/TitleImage.jpg";
import Bride from "../assets/PA_Avatar.jpg";
import Groom from "../assets/Nair_Avatar.jpg";
export type Config = {
  weddingDate: Date;
  location: string;
  groom: Person;
  bride: Person;
  titleImage: StaticImageData;
  galleryImages: StaticImageData[];
  church: Ceremony;
  traditional: Ceremony;
  reception: Ceremony;
};

export type Person = {
  name: string;
  image?: StaticImageData;
  father?: Person;
  mother?: Person;
};

export type Ceremony = {
  location: string;
  address: string;
  date: Date;
  meal?: Date;
  room?: string;
};

export const MyConfig: Config = {
  weddingDate: new Date(2023, 0, 8),
  location: "Nikko Hotel Saigon",
  groom: {
    name: "Viet Anh",
    image: Groom,
    mother: {
      name: "Kim Ngân",
    },
  },
  bride: {
    name: "Phuong Anh",
    image: Bride,
    mother: {
      name: "Vũ Thị Hương",
    },
    father: {
      name: "Bùi Văn Minh",
    },
  },
  titleImage: TitleImage,
  galleryImages: [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
  ],
  church: {
    location: "Nhà thời Giáo Xứ Tân Phú",
    date: new Date(2023, 0, 6, 16),
    address: "Tân Phú, TPHCM",
  },
  traditional: {
    location: "Tư Gia",
    date: new Date(2023, 0, 8, 8, 30),
    address: "TPHCM",
  },
  reception: {
    location: "Nikko Hotel Saigon",
    date: new Date(2023, 0, 8, 18, 0),
    meal: new Date(2023, 0, 8, 19, 0),
    address:
      "235 Nguyen Van Cu Street, Nguyen Cu Trinh Ward, District 11, Ho Chi Minh City",
    room: "Garden",
  },
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
