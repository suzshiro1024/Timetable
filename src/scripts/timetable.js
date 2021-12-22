const station = document.getElementById("station");
const track = document.getElementById("track");
const type = document.getElementById("type");
const dst = document.getElementById("dst");
const departure = document.getElementById("departure");
const message = document.getElementById("message");

//現在時刻から一番近い列車を取得する関数
function getTimetable() {
  //種別色、点滅等をリセット
  message.classList.remove("arriving");
  type.classList.remove("local","semi_express","express","rapid_express","limited_express","rapid_limited_express","mu_sky");

  //表示をリセット
  track.textContent = "";
  type.textContent = "";
  dst.textContent = "";
  departure.textContent = "";
  message.textContent = "";

  let time = new Date();
  let month = time.getMonth() + 1;;
  let date = time.getDate();
  let day = time.getDay();
  let hour = time.getHours();
  let min = time.getMinutes();

  //minは二桁で表示するよう調整
  min = min < 10 ? "0" + min : min;

  //今日が土日か平日かを判定
  //TODO 祝日判定の追加も検討中
  let today;
  if (day == 0 || day == 6) {
    today = "HD";
  } else {
    today = "WD";
  }

  //駅名
  const sta_value = station.value;
  //現在時刻
  let time_current = `${hour}${min}`;
  let array;

  //時刻表を選択する
  if(today == "WD"){
    switch(sta_value){
      case "IY11_UP": array = IY11_UP_WD ;
                      break;
      case "IY11_DOWN": array = IY11_DOWN_WD;
                      break;
    }
  }else{
    switch(sta_value){
      case "IY11_UP": array = IY11_UP_HD;
                      break;
      case "IY11_DOWN": array = IY11_DOWN_HD;
                      break;
    }
  }

  //時刻表のindex(=発車時刻)を配列で取得
  let keys = Object.keys(array);
  //現在時刻以降で一番最初に発車する列車のindex(=発車時刻)を取得
  let next = keys.find(element => Number(element) >= Number(time_current));
  //その列車の情報を取得
  let result = array[next];
  //終電の時刻を過ぎているとundefinedになるので条件分岐
  if(result != undefined){
    //列車の情報を表示する
    track.textContent = result.track;
    dst.textContent = result.destination;
    departure.textContent = result.departure;
    message.textContent = result.message;

    //種別表示
    switch(result.type){
      case "普通":type.classList.add("local");
                  type.textContent = result.type;
                  break;
      case "準急":type.classList.add("semi_express");
                  type.textContent = result.type;
                  break;
      case "急行":type.classList.add("express");
                  type.textContent = result.type;
                  break;
      case "快速急行":type.classList.add("rapid_express");
                  type.textContent = result.type;
                  break;
      case "特急":type.classList.add("limited_express");
                  type.textContent = result.type;
                  break;
      case "快速特急":type.classList.add("rapid_limited_express");
                  type.textContent = result.type;
                  break;
      case "ミュースカイ":type.classList.add("mu_sky");
                  type.textContent = result.type;
                  break;
    }

    //もし列車が到着している場合、列車が到着していることを点滅表示で強調する
    if(Number((result.arrive).replace(":","")) <= Number(time_current) && Number(time_current) <= Number((result.departure).replace(":",""))){
      message.textContent = "Train Approaching"
      message.classList.add("arriving");
    }
  //終電後
  }else{
    message.textContent = "終電が発車しました";
  }
}

window.onload = function () {
  getTimetable();
  setInterval(getTimetable,10000);
};

station.addEventListener("change",function () {
  getTimetable();
  setInterval(getTimetable,10000);
});