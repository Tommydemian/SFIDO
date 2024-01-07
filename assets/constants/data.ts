import { ImageProps } from "react-native";

export type OnBoardingData = {
  id: number;
  image: ImageProps;
  title: string;
  text: string;
};

export const data: OnBoardingData[] = [
  {
    id: 1,
    image: require("../images/onBoarding1.jpeg"),
    title: "Start your path to success",
    text: "Step into SFIDO, where each stride shapes messages that inspire your daily journey.",
  },
  {
    id: 2,
    image: require("../images/onBoarding2.jpeg"),
    title: "Craft your own source of inspiration",
    text: "Craft empowering messages, curate inspiring visuals, select impactful videos, for the ultimate motivational boost..",
  },
  {
    id: 3,
    image: require("../images/onBoarding3.jpeg"),
    title: "Inspiration on your terms",
    text: "Tailor your motivational boosts with SFIDO, scheduling messages for key moments as you journey towards your goals.",
  },
];

export type CategoryIcons = {
  [key: string]: string;
};

export const categoryIcons: CategoryIcons = {
  "Personal Improvement": "lightbulb-o",
  "Resilience and Strength": "tree",
  "Inspiration and Creativity": "paint-brush",
  "Success and Goals": "trophy",
  "Positivity and Optimism": "smile-o",
  "Empowerment and Leadership": "black-tie",
};

// Images mapping
export const bgImages = {
  authbg: require("../../assets/images/authbg.png"),
  // demobg: require("../../assets/images/demoshades.png"),
  // demoprepbg: require("../../assets/images/demoprepbg.png"),
  // categoriebg: require("../../assets/images/categorybg.png"),
  vector: require("../../assets/images/vector.png"),
};

const initialImages = {
  image1: require("../../assets/images/initialImage1.jpg"),
  image2: require("../../assets/images/initialImage2.jpg"),
  image3: require("../../assets/images/initialImage3.jpg"),
  image4: require("../../assets/images/citysmall.jpg"),
  image5: require("../../assets/images/dobermancool.jpeg"),
};

export const initialImagesArr = [
  { id: 1, uri: initialImages.image1 },
  { id: 2, uri: initialImages.image2 },
  { id: 3, uri: initialImages.image3 },
  { id: 4, uri: initialImages.image4 },
  { id: 5, uri: initialImages.image5 },
];
