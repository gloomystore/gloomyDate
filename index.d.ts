declare module 'gloomydate' {
  export const gloomyDate: {
    date(str: string | number, lang?: 'ko' | 'en' | 'jp'): string;
    newDate(): Date;
  };
}
