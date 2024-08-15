(function(global) {
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
        ko: ['년 전', '달 전', '일 전', '시간 전', '분 전', '방금 전'],
        en: ['years ago', 'months ago', 'days ago', 'hours ago', 'minutes ago', 'now'],
        jp: ['年前', '月前', '日前', '時間前', '分前', '今'],
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
        const differ = Math.floor((date - baseDate) / 1000);

        if (differ / 31536000 > 1) return `${Math.floor(differ / 31536000)}${unit[lang][0]}`;
        else if (differ / 2592000 > 1) return `${Math.floor(differ / 2592000)}${unit[lang][1]}`;
        else if (differ / 86400 > 1) return `${Math.floor(differ / 86400)}${unit[lang][2]}`;
        else if (differ / 3600 > 1) return `${Math.floor(differ / 3600)}${unit[lang][3]}`;
        else if (differ / 60 > 1) return `${Math.floor(differ / 60)}${unit[lang][4]}`;
        else return `${unit[lang][5]}`;
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

  // CJS 환경 또는 전역 객체에 gloomyDate 추가
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gloomyDate;
  } else {
    global.gloomyDate = gloomyDate;
  }
})(typeof window !== 'undefined' ? window : global);
