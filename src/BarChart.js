// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

// const BarChart = () => {
//   const [chartData, setChartData] = useState({});

//   const chart = () => {
//     setChartData({
//       labels: ["monday", "tuesday", "wednesday", "thursday", "friday"],
//       datasets: [
//         {
//           label: "level of thiccness",
//           data: [32, 45, 12, 76, 69],
//           backgroundColor: ["rgba(75, 192, 192, 0.6)"],
//           borderWidth: 4,
//         },
//       ],
//     });
//   };
//   useEffect(() => {
//     chart();
//   }, []);
//   return (
//     <div className="App">
//       <h1>BarChart</h1>
//       <div style={{ height: "500px", width: "500px" }}>
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default BarChart;
