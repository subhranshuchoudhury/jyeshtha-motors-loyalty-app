const lightTheme: Theme = {
  isLight: true,
  primary: '#FF0060',
  secondary: '#CF6679',
  background: '#FFFFFF',
  error: '#B00020',
  text: 'black',
  font3: 10,
  fontFamilies: {
    primary: 'Roboto-Regular',
    secondary: 'Roboto-Light',
    bold1: 'Roboto-Bold',
    bold2: 'Roboto-Medium',
  },
};
const darkTheme: Theme = {
  isLight: false,
  primary: '#BB86FC',
  secondary: '#03DAC6',
  background: '#121212',
  error: '#CF6679',
  text: '#FFFFFF',
  font3: 10,
  fontFamilies: {
    primary: 'Roboto-Regular',
    secondary: 'Roboto-Light',
    bold1: 'Roboto-Bold',
    bold2: 'Roboto-Medium',
  },
};

type Theme = {
  isLight: boolean;
  primary: string;
  secondary: string;
  background: string;
  error: string;
  text: string;
  font3: number;
  fontFamilies: {
    primary: string;
    secondary: string;
    bold1: string;
    bold2: string;
  };
};

export {lightTheme, darkTheme};
