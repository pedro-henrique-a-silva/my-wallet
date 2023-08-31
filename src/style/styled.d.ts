import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string,
      gray100: string,
      gray200: string,
      gray300: string,
      gray400: string,
      gray500: string,
      gray600: string,
      blue100: string,
      blue200: string,
      blue400: string,
      blue600: string,
      black: string,
    }
  }
}
