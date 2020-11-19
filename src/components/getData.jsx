// import React from 'react'
// import firebase from "../firebase"

// //一週間前のデータを引っ張てくる
//  const getWeekAgo = () => {
//     const weekAgo = [];
//     const week = [];
//     const day = [];
//     const today = new Date();
//     for (let i = 0; i < 7; i++) {
//       week[i] = today.getMonth() + 1 + "月" + today.getDate() + "日";
//       today.setDate(today.getDate() - 1);
//       day[i] = today.getDay();
//       weekAgo.push({
//         label: week[i],
//         id: day[i],
//         figure: 0,
//       });
//     }
//     // return weekAgo;
//   };

// //   console.log(getWeekAgo);

//   export default getWeekAgo;
// import React from 'react';

// const GetData = () => {
//     const weekAgo = [];
//         const week = [];
//         const day = [];
//         const today = new Date();
//         for (let i = 0; i < 7; i++) {
//           week[i] = today.getMonth() + 1 + "月" + today.getDate() + "日";
//           today.setDate(today.getDate() - 1);
//           day[i] = today.getDay();
//           weekAgo.push({
//             label: week[i],
//             id: day[i],
//             figure: 0,
//           });
//         }
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default GetData;