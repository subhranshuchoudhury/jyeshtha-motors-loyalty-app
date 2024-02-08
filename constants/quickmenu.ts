import {ImageSourcePropType} from 'react-native';

const QuickMenuList: QuickMenuType[] = [
  {
    id: 1,
    title: 'Scanner',
    url: '/',
    image: require('../assets/images/scan-barcode.png'),
    ribbonLabel: '',
  },
  {
    id: 2,
    title: 'Keyboard',
    url: '/about',
    image: require('../assets/images/keyboard.png'),
    ribbonLabel: '',
  },
  {
    id: 3,
    title: 'Help',
    url: '/services',
    image: require('../assets/images/helpPerson.gif'),
    ribbonLabel: '',
  },
  {
    id: 4,
    title: 'Money',
    url: '/contact',
    image: require('../assets/images/money.png'),
    ribbonLabel: '',
  },
];

type QuickMenuType = {
  id: number;
  title: string;
  url: string;
  image: ImageSourcePropType;
  ribbonLabel: string;
};

export default QuickMenuList;
