declare module 'gloomydate' {
  export const gloomyDate: {
    /**
     * Converts a date input into a relative time string.
     * @param input - The date input, which can be a string (formatted as 'YYYY-MM-DD HH:MM:SS' or 'YYYYMMDDHHMMSS'),
     *                a number (timestamp), or a JavaScript Date object.
     * @param lang - The language for the output string ('ko' for Korean, 'en' for English, 'jp' for Japanese).
     * @returns A string representing the relative time.
     */
    date(input: string | number | Date, lang?: 'ko' | 'en' | 'jp'): string;

    /**
     * Returns the current date adjusted to the local time (Korean Standard Time, UTC+9).
     * @returns The current date.
     */
    newDate(): Date;
  };
}
