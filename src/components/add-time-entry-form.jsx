import React, { useState, useEffect } from "react";
import BarChart from "../BarChart";
import firebase from "../firebase";

const AddTimeEntryForm = () => {
  const [temp, setTemp] = useState("");
  console.log(temp);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTemp("");
    firebase
      .firestore()
      .collection("times")
      .add({
        temp: parseInt(temp),
        // getTime: new Date().toString(),
        DateTime: new Date(),
        // getTime: new Date().getDate(),
        getTime: new Date().valueOf(),
        // catchDay: new Date().
        // getDay: new Date().toDateString(),
        // DateTime: new Date().toDateString(),
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Add Temp Entry</h4>
        <div>
          <label>Temp</label>
          <input
            type="number"
            id="number"
            // placeholder="温度"
            value={temp}
            onChange={(e) => setTemp(e.currentTarget.value)}
          />
        </div>
        <button>Add Temp</button>
      </form>
      <BarChart />
    </>
  );
};

export default AddTimeEntryForm;
