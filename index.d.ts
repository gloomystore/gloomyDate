declare module 'gloomydate' {
  export function date(str: string | number, lang?: 'ko' | 'en' | 'jp'): string;
  export function newDate(): Date;
}