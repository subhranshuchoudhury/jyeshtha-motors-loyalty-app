const lightTheme: Theme = {
  isLight: true,
  primary: '#FF0060',
  secondary: '#CF6679',
  background: '#FFFFFF',
  background2: '#F2EFE5',
  error: '#B00020',
  text: 'black',
  font3: 10,
  font2: 13,
  font1: 20,
  fontFamilies: {
    primary: 'Roboto-Regular',
    secondary: 'Roboto-Light',
    bold1: 'Roboto-Bold',
    bold2: 'Roboto-Medium',
    mLight: 'Montserrat-Light',
    RThin: 'Roboto-Thin',
  },
};
const darkTheme: Theme = {
  isLight: false,
  primary: '#BB86FC',
  secondary: '#03DAC6',
  background: '#121212',
  background2: '#1E1E1E',
  error: '#CF6679',
  text: '#FFFFFF',
  font3: 10,
  font2: 13,
  font1: 20,
  fontFamilies: {
    primary: 'Roboto-Regular',
    secondary: 'Roboto-Light',
    bold1: 'Roboto-Bold',
    mLight: 'Montserrat-Light',
    RThin: 'Roboto-Thin',
    bold2: 'Roboto-Medium',
  },
};

type Theme = {
  isLight: boolean;
  primary: string;
  secondary: string;
  background: string;
  background2: string;
  error: string;
  text: string;
  font3: number;
  font2: number;
  font1: number;
  fontFamilies: {
    primary: string;
    secondary: string;
    bold1: string;
    bold2: string;
    mLight: string;
    RThin: string;
  };
};

export {lightTheme, darkTheme};
