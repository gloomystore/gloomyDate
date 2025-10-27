type SupportedLang = 'ko' | 'en' | 'jp';
declare const gloomyDate: {
    date: (input: number | string | Date, lang?: SupportedLang) => string;
    parseStringToTimestamp: (str: string) => number;
    newDate: () => number;
    isDateTimeFormat: (str: string) => boolean;
    isLegacyFormat: (str: string) => boolean;
};

export { gloomyDate as default };
