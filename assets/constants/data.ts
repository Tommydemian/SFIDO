export type Data = {
    id: number;
    image: any;
    title: string;
    text: string;
} 

export const data: Data[] = [
    {
      id: 1,
      image: require('../images/onBoarding1.png'),
      title: 'Start Your Path to Success',
      text: "Welcome to SFIDO, where every step on your journey counts. Here, you create the messages that will guide and inspire you every day.",
    },
    {
      id: 2,
      image: require('../images/onBoarding2.png'),
      title: 'Craft Your Own Source of Inspiration',
      text: "Write motivational messages, choose images that speak to you, or select videos that drive you. Set these reminders to receive them exactly when you need them, whether it's tomorrow, in a week, or at a specific moment of the day.",
    },
    {
      id: 3,
      image: require('../images/wolf.jpeg'),
      title: 'Inspiration on Your Terms',
      text: 'You decide when and how to receive your motivational boosts. Schedule your messages for key moments, and let SFIDO accompany you on your path to your goals.',
    },
  ];