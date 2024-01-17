import { Image, ImageProps } from "react-native";
import { UserProfileData } from "../../src/types";

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

// Categories data
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

export const bgImages = {
  authbg: require("../../assets/images/authbg.png"),
  demobg: require("../../assets/images/demoshades.png"),
  // demoprepbg: require("../../assets/images/demoprepbg.png"),
  // categoriebg: require("../../assets/images/categorybg.png"),
  vector: require("../../assets/images/vector.png"),
};

// Images mapping
const initialImages = {
  image1: require("../../assets/images/initialImage1.jpg"),
  image2: require("../../assets/images/initialImage2.jpg"),
  image3: require("../../assets/images/initialImage3.jpg"),
  image4: require("../../assets/images/citysmall.jpg"),
  image5: require("../../assets/images/dobermancool.jpeg"),
};

export const initialImagesArr = [
  { id: 1, uri: Image.resolveAssetSource(initialImages.image1).uri },
  { id: 2, uri: Image.resolveAssetSource(initialImages.image2).uri },
  { id: 3, uri: Image.resolveAssetSource(initialImages.image3).uri },
  { id: 4, uri: Image.resolveAssetSource(initialImages.image4).uri },
  { id: 5, uri: Image.resolveAssetSource(initialImages.image5).uri },
];

// userProfile data

export const userProfileData: UserProfileData[] = [
  {
    id: 1,
    title: "User Information",
    icon: "user",
  },
  {
    id: 2,
    title: "Contact Information",
    icon: "envelope",
  },
  {
    id: 3,
    title: "Settings",
    icon: "cog",
  },
  {
    id: 4,
    title: "Password Reset",
    icon: "key",
  },
  {
    id: 5,
    title: "Security and Privacy",
    icon: "lock",
  },
  {
    id: 6,
    title: "Feedback and Support",
    icon: "comments",
  },
];
