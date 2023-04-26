export const gloomyDate = {
  date:function(str,lang){
    if(typeof(str) === 'number') str = str.toString();
    if(!lang) lang = 'ko';
    else if(['ko','en','jp'].indexOf(lang) === -1) lang = 'ko';
    const unit = {
      ko:['년 전', '달 전', '일 전', '시간 전', '분 전' , '방금 전'],
      en:['years ago', 'months ago', 'days ago', 'hours ago', 'minute ago', 'now'],
      jp:['年前', '月前', '日前', '時間前', '分前', '今'],
    }
    const regex = /(\d){4}-(\d){2}-(\d){2}\s(\d){2}:(\d){2}:(\d){2}/;
    const regex2 = /(\d){14}/;

    if(!regex.test(str) && !regex2.test(str)) return str
    try {
      const newFormat = regex.test(str) ? str : `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)} ${str.slice(8,10)}:${str.slice(10,12)}:${str.slice(12,14)}`

      const baseDate = Number(new Date(newFormat))
      const date = Number(this.newDate());
      const differ = Math.floor((date - baseDate)/1000)
      if(differ / 31536000 > 1) return `${Math.floor(differ / 31536000)}${unit[lang][0]}`
      else if(differ / 2592000 > 1) return `${Math.floor(differ / 2592000)}${unit[lang][1]}`
      else if(differ / 86400 > 1) return `${Math.floor(differ / 86400)}${unit[lang][2]}`
      else if(differ / 3600 > 1) return `${Math.floor(differ / 3600)}${unit[lang][3]}`
      else if(differ / 60 > 1) return `${Math.floor(differ / 60)}${unit[lang][4]}`
      else return `${unit[lang][0]}`
    } catch(err) {
      console.log(err)
    }
  },
  newDate: function(){
    const date = new Date();
    return date
  }
}