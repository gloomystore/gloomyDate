const gloomyDate = {
  date: function(input, lang) {
    let str;

    if (typeof(input) === 'number') {
      // 숫자 입력을 타임스탬프로 간주하고, 날짜 문자열로 변환
      const date = new Date(input);
      str = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    } else if (typeof(input) === 'string') {
      if (this.isDateTimeFormat(input)) {
        // MySQL DATETIME 형식 문자열 처리
        str = input;
      } else {
        str = input;
      }
    } else if (input instanceof Date) {
      // Date 객체를 처리
      const date = input;
      str = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    } else {
      console.warn(`Unsupported input type: ${typeof(input)}`);
      return input;
    }

    if (!lang) lang = 'ko';
    else if (['ko', 'en', 'jp'].indexOf(lang) === -1) lang = 'ko';

    const unit = {
      ko: ['년 전', '달 전', '일 전', '시간 전', '분 전', '방금 전', '년 후', '달 후', '일 후', '시간 후', '분 후', '조금 뒤'],
      en: ['years ago', 'months ago', 'days ago', 'hours ago', 'minutes ago', 'now', 'years later', 'months later', 'days later', 'hours later', 'minutes later', 'moments later'],
      jp: ['年前', '月前', '日前', '時間前', '分前', '今', '年後', '月後', '日後', '時間後', '分後', '少し後'],
    };

    const regex = /(\d){4}-(\d){2}-(\d){2}\s(\d){2}:(\d){2}:(\d){2}/;
    const regex2 = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}:(\d){2}/;
    const regex3 = /(\d){14}/;

    if (!regex.test(str) && !regex2.test(str) && !regex3.test(str)) {
      console.warn(`Input string's length must be 14, but input ${str}`);
      return str;
    }

    try {
      const newFormat = regex.test(str) 
        ? str 
        : regex2.test(str) 
        ? str.replace('T', ' ') 
        : `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)} ${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12, 14)}`;

      const baseDate = Number(new Date(newFormat));
      const date = Number(this.newDate());
      const differ = Math.floor((baseDate - date) / 1000); // 현재와 입력 날짜의 차이(초 단위)

      if (differ === 0) return `${unit[lang][5]}`;

      const absDiffer = Math.abs(differ);
      const years = Math.floor(absDiffer / 31536000);
      const months = Math.floor(absDiffer / 2592000);
      const days = Math.floor(absDiffer / 86400);
      const hours = Math.floor(absDiffer / 3600);
      const minutes = Math.floor(absDiffer / 60);

      if (differ > 0) { // 미래 날짜
        if (years > 1) return `${years}${unit[lang][6]}`;
        else if (months > 1) return `${months}${unit[lang][7]}`;
        else if (days > 1) return `${days}${unit[lang][8]}`;
        else if (hours > 1) return `${hours}${unit[lang][9]}`;
        else if (minutes > 1) return `${minutes}${unit[lang][10]}`;
        else return `${unit[lang][11]}`;
      } else { // 과거 날짜
        if (years > 1) return `${years}${unit[lang][0]}`;
        else if (months > 1) return `${months}${unit[lang][1]}`;
        else if (days > 1) return `${days}${unit[lang][2]}`;
        else if (hours > 1) return `${hours}${unit[lang][3]}`;
        else if (minutes > 1) return `${minutes}${unit[lang][4]}`;
        else return `${unit[lang][5]}`;
      }
    } catch (err) {
      console.error(err);
    }
  },

  newDate: function() {
    const date = new Date();
    date.setHours(date.getHours() - 9); // UTC 시간에서 9시간 빼기
    return date;
  },

  isDateTimeFormat: function(str) {
    // MySQL DATETIME 형식의 문자열 검증
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
  }
};

export {gloomyDate};
