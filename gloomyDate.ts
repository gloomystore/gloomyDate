type SupportedLang = 'ko' | 'en' | 'jp';

interface UnitMap {
  [key: string]: string[];
}

const gloomyDate = {
  date: function(
    input: number | string | Date,
    lang?: SupportedLang
  ): string {  // 반환 타입을 string으로 고정
    let timestamp: number;
    const language: SupportedLang = lang ?? 'en';

    if (typeof input === 'number') {
      // Unix timestamp (밀리초 또는 초 단위 자동 감지)
      timestamp = input > 10000000000 ? input : input * 1000;
    } else if (typeof input === 'string') {
      timestamp = this.parseStringToTimestamp(input);
      if (isNaN(timestamp)) {
        console.warn(`Unsupported string format: ${input}`);
        return String(input);  // 문자열로 반환
      }
    } else if (input instanceof Date) {
      timestamp = input.getTime();
      if (isNaN(timestamp)) {
        console.warn(`Invalid Date object: ${input}`);
        return input.toString();  // Date를 문자열로 변환
      }
    } else {
      console.warn(`Unsupported input type: ${typeof input}`);
      return String(input);  // 문자열로 변환
    }

    const unit: UnitMap = {
      ko: ['년 전', '달 전', '일 전', '시간 전', '분 전', '방금 전', '년 후', '달 후', '일 후', '시간 후', '분 후', '잠시 후'],
      en: ['years ago', 'months ago', 'days ago', 'hours ago', 'minutes ago', 'now', 'years later', 'months later', 'days later', 'hours later', 'minutes later', 'moments later'],
      jp: ['年前', '月前', '日前', '時間前', '分前', '今', '年後', '月後', '日後', '時間後', '分後', '少し後'],
    };

    const now = this.newDate();
    const differ = Math.floor((timestamp - now) / 1000);

    if (differ === 0) return `${unit[language][5]}`;

    const absDiffer = Math.abs(differ);
    const years = Math.floor(absDiffer / 31536000);
    const months = Math.floor(absDiffer / 2592000);
    const days = Math.floor(absDiffer / 86400);
    const hours = Math.floor(absDiffer / 3600);
    const minutes = Math.floor(absDiffer / 60);

    if (differ > 0) {
      if (years > 1) return `${years} ${unit[language][6]}`;
      else if (months > 1) return `${months} ${unit[language][7]}`;
      else if (days > 1) return `${days} ${unit[language][8]}`;
      else if (hours > 1) return `${hours} ${unit[language][9]}`;
      else if (minutes > 1) return `${minutes} ${unit[language][10]}`;
      else return `${unit[language][11]}`;
    } else {
      if (years > 1) return `${years} ${unit[language][0]}`;
      else if (months > 1) return `${months} ${unit[language][1]}`;
      else if (days > 1) return `${days} ${unit[language][2]}`;
      else if (hours > 1) return `${hours} ${unit[language][3]}`;
      else if (minutes > 1) return `${minutes} ${unit[language][4]}`;
      else return `${unit[language][5]}`;
    }
  },

  parseStringToTimestamp: function(str: string): number {
    // 1. YYYYMMDDHHMMSS 형식 (14자리 숫자)
    if (/^\d{14}$/.test(str)) {
      const formatted = str.replace(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        '$1-$2-$3T$4:$5:$6'
      );
      return new Date(formatted).getTime();
    }

    // 2. ISO 8601 형식들
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
      return new Date(str).getTime();
    }

    // 3. Legacy 형식 (YYYY-MM-DD HH:MM:SS)
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) {
      return new Date(str.replace(' ', 'T')).getTime();
    }

    // 4. Date only 형식 (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return new Date(str).getTime();
    }

    // 5. YYYY/MM/DD 형식
    if (/^\d{4}\/\d{2}\/\d{2}/.test(str)) {
      return new Date(str).getTime();
    }

    // 6. MM/DD/YYYY 형식 (미국식)
    if (/^\d{2}\/\d{2}\/\d{4}/.test(str)) {
      return new Date(str).getTime();
    }

    // 7. 그 외 모든 경우
    const timestamp = new Date(str).getTime();
    return timestamp;
  },

  newDate: function(): number {
    return new Date().getTime();
  },

  // 하위 호환성을 위해 남겨둠
  isDateTimeFormat: function(str: string): boolean {
    const regex = /^\d{14}$/;
    return regex.test(str);
  },

  isLegacyFormat: function(str: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
  }
};

export default gloomyDate;
