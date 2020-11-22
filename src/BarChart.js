import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./components/add-time-entry-form";
// import GetData from "./components/GetData";
import firebase from "./firebase";
import dayjs from "dayjs";

const BarChart = () => {
  // const [chartData, setChartData] = useState({});
  // const [dataArr, setDataArr] = useState(null);
  // const [getDate, setGetDate] = useState(null);
  // const [items, setItems] = useState(null);
  const db = firebase.firestore().collection("times");
  // console.log(new Date(1606009436321));

  /////////////////////////////////////
  //こちらはgetdayと日付が一致している
  ////////////////////////////////////
  const hope = [];
  const now2 = new Date();
  const tomorrow = now2.setDate(now2.getDate() + 1);
  const infoWeek = [];
  const infoDay = [];
  let addDate = 1;
  let max = 7;
  for (let i = 0; i < max; i++) {
    now2.setDate(now2.getDate() - addDate);
    infoWeek[i] = now2.getMonth() + 1 + "/" + now2.getDate();
    infoDay[i] = now2.getDay();
    hope.push({
      la: infoWeek[i],
      idDay: infoDay[i],
      cha: 0,
    });
  }
  // console.log(hope);

  // const list2 = hope.map((el) => el.idDay);
  // console.log(list2);

  //////////////////////////////////////////
  //こちらはgetdayと日付が一致していない！！！
  ///////////////////////////////////////////

  const weekAgo = [];
  // console.log(weekAgo);
  // const list = weekAgo.map((el) => el.id);
  // console.log(list);
  const week = [];
  //日付の順番を右から左にする処理
  const reversedWeek = week.reverse();

  const day = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    week[i] = today.getMonth() + 1 + "月" + today.getDate() + "日";
    today.setDate(today.getDate() - 1);
    day[i] = today.getDay();
    weekAgo.push({
      label: week[i],
      id: day[i],
      figure: 0,
    });
  }

  let now = dayjs(); //dayjsライブラリを使用
  let weekAgo2 = now.subtract(7, "day").format();

  let agoDate = new Date();
  let agoWeek = agoDate.setDate(agoDate.getDate() - 7);
  // console.log(agoWeek);

  useEffect(() => {
    db.where("DateTime", ">", firebase.firestore.Timestamp.fromDate(agoDate))
      .orderBy("DateTime")
      .onSnapshot((snapshot) => {
        const test = snapshot.docs.map((doc) => {
          let item = doc.data();
          console.log(item);
          let item2 = dayjs(item.getTime);
          item.getTime = item2;
          const item3 = item2.day();

          // console.log(item3);
          // if (item2.isAfter(weekAgo2)) {
          //   console.log("一週間以内のデータだよ！！！");
          //   // console.log(item);
          //   return item;
          // } else {
          //   console.log("NOOOOOOOOOOOOOOO!!!");
          // }
        });
      });
  }, []);

  //ここはdotsデータの勉強時間が入る
  const figureList = weekAgo.map((el) => el.figure);

  // console.log(getDate);
  // useEffect(() => {
  //   const queryInfo = firebase
  //     .firestore()
  //     .collection("times")
  //     .orderBy("DateTime")
  //     .limitToLast(7);
  //   queryInfo.get().then((snapshot) => {
  //     const test2 = snapshot.docs.map((doc) => {
  //       let item = doc.data();
  //       let time = item.DateTime;
  //       let temp = item.temp;
  //       let datetime;

  //       if (time !== undefined && temp !== undefined) {
  //         datetime =

  //         return {
  //           time: datetime,
  //           temp: temp,
  //         };
  //       }
  //     });
  //     setDataArr(
  //       test2.map((t) => {
  //         return t.temp;
  //       })
  //     );
  //     setGetDate(
  //       test2.map((t) => {
  //         return t.time;
  //       })
  //     );
  //   });
  // }, []);

  return (
    <div className="App">
      {/* <GetData /> */}
      <div style={{ height: "500px", width: "500px" }}>
        <Line
          data={{
            labels: reversedWeek,
            datasets: [
              {
                label: " # Your trajectory",
                data: figureList,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    // maxTicksLimit: 3,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
      {/* {dataArr && dataArr.map((data) => <li key={data.temp}> {data.temp} </li>)} */}
    </div>
  );
};

export default BarChart;
