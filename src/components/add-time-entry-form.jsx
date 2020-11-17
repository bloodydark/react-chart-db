import React, { useState } from "react";
import firebase from "../firebase";

const AddTimeEntryForm = () => {
  const [temp, setTemp] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection("times")
      .add({
        temp: parseInt(temp),
        DateTime: new Date(),
      })
      .then(() => {
        setTemp("");
      });
  }
  return (
    <form onSubmit={onSubmit}>
      <h4>Add Temp Entry</h4>
      <div>
        <label>Temp</label>
        <input
          type="number"
          value={temp}
          onChange={(e) => setTemp(e.currentTarget.value)}
        />
      </div>
      <button>Add Temp</button>
    </form>
  );
};

export default AddTimeEntryForm;
