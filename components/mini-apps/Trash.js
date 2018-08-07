const Trash = {
  title: "today's trash",

  load(windowName) { 
    const language = "Japanese";   
    const date = new Date();
    const today = date.getDay();
    const checkWeeks = (weeks, thisWeek) => {
      for(let i = 0; i < weeks.length; i++)
      {
        if (thisWeek === weeks[i]) return true;
      }
      return false;
    }
    
    const getMonthName = (date) => {
      // const locale = "en-us";
      const locale = "ja-jp";
      const month = date.toLocaleString(locale, { month: "long" });
      return month;
    }
    
    const weekday = (date) => {
      if(language==="Japanese") {
        switch(date.getDay()) {
          case 0: return "日";
          case 1: return "月";
          case 2: return "火";
          case 3: return "水";
          case 4: return "木";
          case 5: return "金";
          case 6: return "土";
          default: return "Pirate day"
        }
      }
      else switch(date.getDay()) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Pirate day"
      }
    
    }
    const weekNo = (date) => {
      const today = date.getDate();
      if(today>28) return 5;
      else if(today>21) return 4;
      else if(today>14) return 3;
      else if(today>7) return 2;
      else return 1;
    }
    
  /* Create trash array */
    let TrashDayArray = [];
    const createTrashDay = (type, contents, day, weeks) => {
      TrashDayArray.push({"type": type, "contents": contents, "day": day, "weeks": weeks});
    }

    createTrashDay("燃やせるゴミ", "", 1, [1,2,3,4,5]);
    createTrashDay("燃やせるゴミ", "", 4, [1,2,3,4,5]);
    createTrashDay("容器プラスチック", "", 3, [1,2, 3, 4, 5]);
    createTrashDay("ペットボトル", "", 5, [2,4]);
    createTrashDay("被害ゴミ類・有害ゴミ", "", 2, [1,3]);
    createTrashDay("びん・かん・スプレー缶", "", 2, [2,4]);
    createTrashDay("新聞・雑誌・段ボール", "", 5, [3]);
    createTrashDay("小型家電製品・古着・古妨", "", 5, [1]);

    const getTrash = () => {
      for (let i = 0; i < TrashDayArray.length; ++i) {
        if(today===TrashDayArray[i].day
            && checkWeeks(TrashDayArray[i].weeks, weekNo(date)))
        {
          return TrashDayArray[i].type;
        }
      }
      return "none";
    }
  /* ------------------*/

    document.getElementById(windowName).innerHTML =  `
      <div class="Trash">
        ${1900+date.getYear()}年${getMonthName(date)}${date.getDate()}日 (
        ${weekday(date)})
        <br/>
        今日のごみは<strong>
         ${getTrash()}。</strong>
        <br/>
        お疲れ様でした。
        <br/>
        明日のごみは<strong>
         ${getTrash()}</strong>じゃない。
        <br/>
      </div>
    `;
  }
}
