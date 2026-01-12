export interface OnboardingSlideData {
  id: string;
  title: string;
  description: string;
  image: any; // Using any for require() images for now, can be typed better later
}

export const ONBOARDING_DATA: OnboardingSlideData[] = [
  {
    id: '1',
    title: 'Discover our handpicked selection of top dishes',
    description: 'Choose your food from the menu there are multiple options available.',
    // Placeholder image, in a real app we would have local assets
    image: 'https://img.freepik.com/free-vector/online-grocery-shopping-concept_23-2148533314.jpg', 
  },
  {
    id: '2',
    title: 'Secure and convenient online payments',
    description: 'Hassle-free and online payments with all major card options available.',
    image: 'https://img.freepik.com/free-vector/mobile-payments-concept-illustration_114360-1243.jpg',
  },
  {
    id: '3',
    title: 'Enjoy fast, reliable delivery straight to your doorstep',
    description: 'Online reservation and home delivery system for restaurants and cafes.',
    image: 'https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg',
  },
];
