const lightTheme: Theme = {
  isLight: true,
  primary: '#FF0060',
  secondary: '#CF6679',
  background: '#FFFFFF',
  error: '#B00020',
  font3: 10,
};
const darkTheme: Theme = {
  isLight: false,
  primary: '#BB86FC',
  secondary: '#03DAC6',
  background: '#121212',
  error: '#CF6679',
  font3: 10,
};

type Theme = {
  isLight: boolean;
  primary: string;
  secondary: string;
  background: string;
  error: string;
  font3: number;
};

export {lightTheme, darkTheme};
