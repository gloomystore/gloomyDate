const gloomyDate = {
  date: function(input, lang = 'ko') {
    let timestamp;

    if (typeof(input) === 'number') {
      // 입력이 이미 타임스탬프인 경우
      timestamp = input;
    } else if (typeof(input) === 'string') {
      // 문자열 입력을 타임스탬프로 변환
      if (this.isDateTimeFormat(input)) {
        timestamp = new Date(input.replace('T', ' ')).getTime();
      } else {
        // 형식이 맞지 않는 경우, 타임스탬프로 변환할 수 없음
        console.warn(`Unsupported string format: ${input}`);
        return input;
      }
    } else if (input instanceof Date) {
      // Date 객체를 타임스탬프로 변환
      timestamp = input.getTime();
    } else {
      console.warn(`Unsupported input type: ${typeof(input)}`);
      return input;
    }

    const now = this.newDate();
    const differ = Math.floor((timestamp - now) / 1000); // 현재와 입력 날짜의 차이(초 단위)

    if (differ === 0) return `${unit[lang][5]}`;

    const absDiffer = Math.abs(differ);
    const years = Math.floor(absDiffer / 31536000);
    const months = Math.floor(absDiffer / 2592000);
    const days = Math.floor(absDiffer / 86400);
    const hours = Math.floor(absDiffer / 3600);
    const minutes = Math.floor(absDiffer / 60);

    const unit = {
      ko: ['년 전', '달 전', '일 전', '시간 전', '분 전', '방금 전', '년 후', '달 후', '일 후', '시간 후', '분 후', '잠시 후'],
      en: ['years ago', 'months ago', 'days ago', 'hours ago', 'minutes ago', 'now', 'years later', 'months later', 'days later', 'hours later', 'minutes later', 'moments later'],
      jp: ['年前', '月前', '日前', '時間前', '分前', '今', '年後', '月後', '日後', '時間後', '分後', '少し後'],
    };

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
  },

  newDate: function() {
    // 현재 시간의 한국 시간대 타임스탬프 반환
    const now = new Date();
    now.setHours(now.getHours());
    return now.getTime();
  },

  isDateTimeFormat: function(str) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
  }
};

export default gloomyDate;
